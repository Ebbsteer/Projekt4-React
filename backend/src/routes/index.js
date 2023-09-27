import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { signedCookie } from "cookie-parser";

import { hashMD5 } from "../lib/md5.js";

export const router = Router();

import {
    getUser,
    getUserByUsername,
} from "../database.js";

router.use((req, res, next) => {
    if (!req.signedCookies?.cid) {
        res.cookie("cid", uuidv4(), {
            maxAge: 1000 * 60 * 60 * 24 * 365,
            signed: true,
        });
    }
    req.cid = signedCookie(req.signedCookies.cid, req.secret || "");
    if (req.cid) {
        const user = getUser(req.cid);
        if (user) {
            req.user = user;
        }
    }

    console.log({ cid: req.cid, user: req.user, path: req.path });

    next();
});

const authRoute =  (req, res, next) => {
    console.log("authRoute");
    if(!req.user) return next("router");

    next();
}

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
        res.location = redirectUrl;
        return res.send(`
            Redirecting to ${redirectUrl}<br><a href="${redirectUrl}">Click here if you are not redirected</a>
        `);
    }
    
    res.location = "/login";
    return res.status(400);
})

router.route("/test").get(authRoute, (req, res) => {
    console.log("You accessed /test!");

    res.send(200);
})