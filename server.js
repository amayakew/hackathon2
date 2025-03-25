import express from "express";
import f1Router from "./routes/races.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use("/api", f1Router);
app.use("/", express.static(__dirname + '/public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`run on ${PORT}`);
});