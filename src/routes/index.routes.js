import { Router } from "express";
import gamesRouter from "./games.routes.js";
import clientsRouter from "./clients.routes.js";
import rentsRouter from "./rents.routes.js";

const routes = Router();

routes.use(gamesRouter);
routes.use(clientsRouter);
routes.use(rentsRouter);

export default routes;