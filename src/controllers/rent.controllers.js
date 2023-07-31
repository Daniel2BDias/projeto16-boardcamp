import db from "../database/postgreSQL.database.js";

export const getRents = async (req, res) => {
  try {
    const rents = await db.query(`
        SELECT rentals.*,
        JSON_BUILD_OBJECT('id', customers.id, 'name', customers.name) AS customer,
        JSON_BUILD_OBJECT('id', games.id, 'name', games.name) AS game,
        TO_CHAR("returnDate", 'YYYY-MM-DD') AS "returnDate",
        TO_CHAR("rentDate", 'YYYY-MM-DD') AS "rentDate" 
        FROM rentals
        JOIN customers ON rentals."customersId" = customers.id
        JOIN games ON rentals."gameId" = games.id
        ;`);

    res.status(200).send(rents.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const registerNewRent = async (req, res) => {
  const { customerId, gameId, daysRented } = req.body;

  try {
    const existingClient = await db.query(`SELECT * FROM customers WHERE id=$1`, [
      customerId,
    ]);

    const inStock = await db.query(`SELECT * FROM games WHERE id=$1`, [gameId]);
    const activeRents = await db.query(`SELECT * FROM rentals WHERE rentals."gameId"=$1`, [gameId])

    if (existingClient.rows.length === 0 || activeRents.rows.length >= inStock.rows[0].stockTotal) {
      return res.sendStatus(400);
    }

    console.log(inStock.rows[0].stockTotal);

    const originalPrice = daysRented * inStock.pricePerDay;

    await db.query(``);

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const returnGame = async (req, res) => {
  const { id } = req.params;
  try {
    const validGame = await db.query(`SELECT * FROM games WHERE id=$1`, [id]);
    if (validGame.rows.length === 0) return res.sendStatus(404);
    if(validGame.rows[0]?.returnDate !== null) return res.sendStatus(400);

    const gameReturn = await db.query(
      `UPDATE rentals SET "returnDate" = NOW() WHERE id=$1;
       UPDATE rentals SET "delayFEE" = fee=$2 WHERE id=$1`,
      [id, fee]
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteRentalEntry = async (req, res) => {
  const { id } = req.params;
  try {
    const finishedRental = await db.query(`SELECT * FROM rentals WHERE id=$1`, [
      id,
    ]);

    if (finishedRental.rows[0].returnDate === null) return res.sendStatus(400);

    const deletion = await db.query(
      `DELETE * FROM rentals WHERE id=$1 AND NOT rentals."returnDate" = ${null}`,
      [id]
    );

    if (deletion.rows.length === 0) return res.sendStatus(404);

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
