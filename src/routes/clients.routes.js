import { Router } from "express";
import {
  editClientRegistry,
  getClientById,
  getClients,
  registerNewClient,
} from "../controllers/clients.controllers.js";
import validateSchema from "../middlewares/validateSchemas.middleware.js";
import clientSchema from "../schemas/clients.schemas.js";

const clientsRouter = Router();

clientsRouter.get("/customers", getClients);
clientsRouter.get("/customers/:id", getClientById);
clientsRouter.post("/customers", validateSchema(clientSchema), registerNewClient);
clientsRouter.put("/customers/:id", validateSchema(clientSchema), editClientRegistry);

export default clientsRouter;
