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
    req.cid = req.signedCookies?.cid;
    console.log(req.cid);

    if (!req.cid) {
        req.cid = uuidv4();

        res.cookie("cid", req.cid, {
            maxAge: 1000 * 60 * 60 * 24 * 365,
            signed: true,
        });

        next();
    }

    const user = getSecureUser(req.cid);
    if (user) req.user = user;

    next();
});

const authRoute = (req, res, next) => {
    console.log("authRoute");
    if (!req.user || !req.cid) return res.send("router");

    const user = getSecureUser(req.cid);
    if (user !== req.user) return res.send("router");

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
    insertUser(req.cid, username, hashedPassword, question, hashedQuestionAnswer);

    res.status(200).send("Registration successful");
});

router.route("/login").post((req, res) => {
    const { username, password } = req.body;

    const redirectUrl = req.query.redirect ? `${req.query.redirect}` : "/";

    console.log("login", username, password);

    if (!username || !password) {
        return res.status(400).send("Missing username or password");
    }

    const user = getUserByUsername(username);
    const hashedPassword = hashMD5(password);

    if (user?.password_hash === hashedPassword) {
        res.cookie("cid", user.cid, {
            maxAge: 1000 * 60 * 60 * 24 * 365,
            signed: true,
        });

        // Security issue: Open Redirect, should check against regex
        res.location = redirectUrl;
        return res.send(`
            Redirecting to ${redirectUrl}<br><a href="${redirectUrl}">Click here if you are not redirected</a>
        `);
    }

    res.location = "/login";
    return res.status(400).send("User not found, create an account");
});

router.post("/logout", (req, res) => {
    res.clearCookie("cid");
    res.redirect("/");
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

    updateUserPassword(result.cid, hashedPassword);

    return res.status(200).send("OK");
});

// Update later
router.route("/user").get(authRoute, (req, res) => {
    const userData = getSecureUser(req.cid);
    console.log(userData);

    res.status(200).json(userData);
});

router.route("/user/update").post(authRoute, (req, res) => {
    const { username, password, question, question_answer, image_blob } =
        req.body;

    if (!username || !password || !question || !question_answer || !image_blob)
        return res.status(400).send("Missing parameters");

    const hashedPassword = hashMD5(password);
    const hashedQuestionAnswer = hashMD5(question_answer);

    updateUser(
        req.cid,
        username,
        hashedPassword,
        question,
        hashedQuestionAnswer,
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
