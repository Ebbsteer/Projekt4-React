import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { signedCookie } from "cookie-parser";

import { hashMD5 } from "../lib/md5.js";
import {
    getUser,
    getSecureUser,
    getUserByUsername,
    insertUser,
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
    if (!req.user) return next("router");

    next();
};

router.route("/register").post((req, res) => {
    const { username, password } = req.body;

    // no session id (how?)
    if (!req.cid) return res.send("router");

    // no password or username passed :p
    if (!username || !password) return res.send("router");

    const user = getUserByUsername(username);

    // user exists
    if (user) return res.location("/login");

    const hashedPassword = hashMD5(password);
    insertUser(req.cid, username, hashedPassword, 1);

    res.status(200).send("Registration successful");
});

router.route("/login").post((req, res) => {
    const { username, password } = req.body;

    const redirectUrl = req.query.redirect ? `${req.query.redirect}` : "/";

    console.log("login", username, password);

    if (!username || !password) {
        return res.status(400);
    }

    const user = getUserByUsername(username);
    const hashedPassword = hashMD5(password);

    if (user?.password_hash === hashedPassword) {
        res.cookie("cid", user.cid, {
            maxAge: 1000 * 60 * 60 * 24 * 365,
            signed: true,
        });

        res.location = redirectUrl;
        return res.send(`
            Redirecting to ${redirectUrl}<br><a href="${redirectUrl}">Click here if you are not redirected</a>
        `);
    }

    res.location = "/login";
    return res.status(400);
});

router.post("/logout", (req, res) => {
    res.clearCookie("cid");
    res.redirect("/");
});

router.route("/test").get(authRoute, (req, res) => {
    console.log("You accessed /test!");

    res.send(200);
});

router.route("/favorite/add").patch(authRoute, (req, res) => {
    const { id } = req.body;

    res.send(200);
});

router.route("/favorite/remove").patch(authRoute, (req, res) => {
    const { id } = req.body;

    res.send(200);
});

router.route("/favorite/list").get(authRoute, (req, res) => {
    res.send(200);
});
