import db from "../database/postgreSQL.database.js";

export const getClients = async (req, res) => {
  try {
    const clients = await db.query(`SELECT * FROM costumers;`);
    res.status(200).send(clients.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getClientById = async (req, res) => {
  const { id } = req.params;
  try {
    const clientById = await db.query(`SELECT * FROM costumers WHERE id=$1;`, [
      id,
    ]);
    if(!clientById) return res.sendStatus(404);
    res.status(200).send(clientById.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const registerNewClient = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const editClientRegistry = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send(error.message);
  }
};