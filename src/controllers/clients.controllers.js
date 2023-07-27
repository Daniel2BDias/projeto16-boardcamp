import db from "../database/postgreSQL.database.js";

export const getClients = async (req, res) => {
  try {
    const clients = await db.query(`SELECT * FROM costumers;`);
    res.status(200).send(clients?.rows);
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
    if (!clientById) return res.sendStatus(404);
    res.status(200).send(clientById.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const registerNewClient = async (req, res) => {
  const { name, cpf, birthday, phone } = req.body;
  try {
    const alreadyRegistered = await db.query(
      `SELECT * FROM customers WHERE cpf=$1;`,
      [cpf]
    );
    if (alreadyRegistered?.rows[0]?.name) return res.sendStatus(409);

    await db.query(
      `INSERT INTO customers (name, cpf, birthday, phone) VALUES ($1, $2, $3, $4);`,
      [name, cpf, birthday, phone]
    );
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const editClientRegistry = async (req, res) => {
  const { name, cpf, birthday, phone } = req.body;
  const { id } = req.params;

  try {
    const cpfConflict = await db.query(
      `SELECT * FROM customers WHERE cpf=$1;`,
      [cpf]
    );
    if (cpfConflict?.rows[0]?.cpf) return res.sendStatus(409);

    await db.query(
      `UPDATE customers SET name=$2, cpf=$3, birthday=$4, phone=$5 WHERE id=$1;`,
      [id, name, cpf, birthday, phone]
    );
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
};