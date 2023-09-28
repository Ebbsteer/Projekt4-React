import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

import { fileURLToPath } from "url";
import { router } from "./routes/index.js";
import { setupDB } from "./database.js";
import { urlencoded } from "express";


const app = express();
const port = 3000;

const __dirname = fileURLToPath(new URL(".", import.meta.url));

app.use(cookieParser("very secret")); // Bör bytas ut i production :^)

app.use(cors());

app.use(
    urlencoded({
        extended: true,
    }),
);

app.use(express.static(path.join(__dirname, "../public")));

app.use(router);

setupDB();

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})