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

app.use(
    cors({
        origin: "http://localhost:5173", // Bör bytas ut i production :^)
        credentials: true,
    })
);

app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

app.use(router);

setupDB();

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
