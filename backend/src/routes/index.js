import { Router } from "express";

export const router = Router();

router.route("/test").get((req, res) => {
    console.log("You accessed /test!");

    res.send(200);
})