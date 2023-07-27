import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.routes.js";

const app = express();

app.use(json());
app.use(cors());
dotenv.config();

app.use(routes);

const port = (process.env.PORT || 5000);
app.listen(port, () => console.log(`Servidor online! Porta: ${port}`));
