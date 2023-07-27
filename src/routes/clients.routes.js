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

clientsRouter.get("/costumers", getClients);
clientsRouter.get("/costumers/:id", getClientById);
clientsRouter.post("/costumers", validateSchema(clientSchema), registerNewClient);
clientsRouter.put("/costumers/:id", validateSchema(clientSchema), editClientRegistry);

export default clientsRouter;
