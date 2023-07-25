import { Router } from "express";
import validateSchema from "../middlewares/validateSchemas.middleware.js";
import gameSchema from "../schemas/games.schemas.js";
import { getGames, registerNewGame } from "../controllers/games.controllers.js";

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", validateSchema(gameSchema), registerNewGame);

export default gamesRouter;