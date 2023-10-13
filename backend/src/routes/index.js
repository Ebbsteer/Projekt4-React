import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { signedCookie } from "cookie-parser";

import { hashMD5 } from "../lib/md5.js";
import {
    getUser,
    getSecureUser,
    getUserByUsername,
    insertUser,
    getFavorites,
    addFavorite,
    deleteFavorite,
    updateUser,
    getUserByQuestion,
    updateUserPassword,
} from "../database.js";

export const router = Router();

router.use((req, res, next) => {
    if (!req.signedCookies?.cid) {
        res.cookie("cid", uuidv4(), {
            maxAge: 1000 * 60 * 60 * 24 * 365,
            signed: true,
        });
    }

    req.cid = signedCookie(req.signedCookies.cid, req.secret || "");

    console.log(req.cid);

    if (req.cid) {
        const user = getSecureUser(req.cid);
        if (user) req.user = user;
    }

    next();
});

const authRoute = (req, res, next) => {
    console.log("authRoute");
    console.log(req.cid)
    if (!req.cid) return res.status(400).send("Failed");

    const user = getSecureUser(req.cid);
    if (!user) return res.status(403).send("Failed");

    next();
};

router.route("/register").post((req, res) => {
    const { username, password, question, question_answer } = req.body;

    // no session id (how?)
    if (!req.cid) {
        return res.status(400).send("Missing CID");
    }

    // no password or username passed :p
    if (!username || !password || !question || !question_answer) {
        return res.status(400).send("Missing username or password");
    }

    const user = getUserByUsername(username);

    // user exists
    if (user) {
        res.location("/login");
        return res.status(302).send("User already exists");
    }

    const hashedPassword = hashMD5(password);
    const hashedQuestionAnswer = hashMD5(question_answer);
    insertUser(
        req.cid,
        username,
        hashedPassword,
        question,
        hashedQuestionAnswer
    );

    res.status(200).send("Registration successful");
});

router.route("/login").post((req, res) => {
    const { username, password } = req.body;

    const redirectUrl = req.query.redirect ? `${req.query.redirect}` : "/";
    console.log(redirectUrl);

    console.log("login", username, password);

    if (!username || !password) {
        return res.status(400).send("Missing username or password");
    }

    const user = getUserByUsername(username);
    const hashedPassword = hashMD5(password);

    if (user?.password_hash === hashedPassword) {
        console.log({cid: user.id})
        res.cookie("cid", user.id, {
            maxAge: 1000 * 60 * 60 * 24 * 365,
            signed: true,
        });

        // Security issue: Open Redirect, should check against regex
        res.location = "http://localhost:5173/profil";
        return res.send(`
            Redirecting to http://localhost:5173/profil <br><a href="http://localhost:5173/profil">Click here if you are not redirected</a>
        `);
    }

    res.location = "/login";
    return res.status(400).send("User not found, create an account");
});

router.post("/logout", (req, res) => {
    res.clearCookie("cid");
    /*res.redirect("/");*/
    res.status(200).send("ok");
});

router.route("/account-recovery").post((req, res) => {
    const { username, question_answer, new_password } = req.body;

    if (!username || !question_answer)
        return res.status(400).send("Missing parameters");

    const hashedQuestionAnswer = hashMD5(question_answer);
    const result = getUserByQuestion(username, hashedQuestionAnswer);

    // This return technically gives wrong return message + error code but we do this
    // to confuse any potential attackers trying to bruteforce out user reset question :^)
    if (!result) return res.status(400).send("Missing parameters");

    const hashedPassword = hashMD5(new_password);

    updateUserPassword(result.id, hashedPassword);

    return res.status(200).send("OK");
});

// Update later
router.route("/user").get(authRoute, (req, res) => {
    const userData = getSecureUser(req.cid);
    console.log("CID:" + req.cid);

    res.status(200).json(userData);
});

router.route("/user/update").post(authRoute, (req, res) => {
    const { username, image_blob } =
        req.body;

    if (!username || !image_blob)
        return res.status(400).send("Missing parameters");

    // const hashedPassword = hashMD5(password);
    // const hashedQuestionAnswer = hashMD5(question_answer);

    updateUser(
        req.cid,
        username,
        image_blob
    );

    res.status(200).send("Updated user");
});

// Update later
router.route("/favorite/add").patch(authRoute, (req, res) => {
    const { fid } = req.body;

    addFavorite(req.cid, fid);

    res.send(200);
});

// Update later
router.route("/favorite/remove").patch(authRoute, (req, res) => {
    const { fid } = req.body;

    deleteFavorite(req.cid, fid);

    res.send(200);
});

router.route("/favorite/list").get(authRoute, (req, res) => {
    const favorites = getFavorites(req.cid).split(";");

    res.send(200).json(favorites);
});
