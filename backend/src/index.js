import express from "express";
import path from "path";

import { router } from "./routes/index.js";

const app = express();

const port = 3000;

app.use(router);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})