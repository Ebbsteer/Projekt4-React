import express from "express";
import path from "path";

import { router } from "./routes/index.js";
import { setupDB } from "./database.js";

const app = express();

const port = 3000;

app.use(router);

setupDB();

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})