import { Router } from "express";
import {
  deleteRentalEntry,
  getRents,
  registerNewRent,
  returnGame,
} from "../controllers/rent.controllers.js";
import rentSchema from "../schemas/rent.schemas.js";
import validateSchema from "../middlewares/validateSchemas.middleware.js";

const rentsRouter = Router();

rentsRouter.get("/rentals", getRents);
rentsRouter.post("/rentals", validateSchema(rentSchema), registerNewRent);
rentsRouter.post("/rentals/:id/return", returnGame);
rentsRouter.delete("/rentals/:id", deleteRentalEntry);

export default rentsRouter;
