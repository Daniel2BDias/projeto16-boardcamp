import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.routes.js";

const app = express();

app.use(json());
app.use(cors());
dotenv.config;

app.use(routes);

app.listen(process.env.PORT, () => console.log(`Servidor online! Porta: ${process.env.PORT}`));
