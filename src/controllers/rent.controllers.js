import db from "../database/postgreSQL.database.js";
import dayjs from "dayjs";

export const getRents = async (req, res) => {
  try {
    const rents = await db.query(`
        SELECT rentals.*,
        JSON_BUILD_OBJECT('id', customers.id, 'name', customers.name) AS customer,
        JSON_BUILD_OBJECT('id', games.id, 'name', games.name) AS game,
        TO_CHAR("returnDate", 'YYYY-MM-DD') AS "returnDate",
        TO_CHAR("rentDate", 'YYYY-MM-DD') AS "rentDate" 
        FROM rentals
        JOIN customers ON rentals."customerId" = customers.id
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
    const existingClient = await db.query(
      `SELECT * FROM customers WHERE id=$1`,
      [customerId]
    );

    const game = await db.query(`SELECT * FROM games WHERE id=$1`, [gameId]);
    const activeRents = await db.query(
      `SELECT * FROM rentals WHERE rentals."gameId"=$1`,
      [gameId]
    );

    if (
      existingClient.rows.length === 0 ||
      activeRents.rows.length >= game.rows[0].stockTotal
    ) {
      return res.sendStatus(400);
    }

    const originalPrice = daysRented * game.rows[0].pricePerDay;

    await db.query(
      `INSERT INTO rentals 
    ("customerId", "gameId", "rentDate", "daysRented", "returnDate",
     "originalPrice","delayFee") 
     VALUES ($1, $2, NOW(), $3, ${null}, $4, ${null})
     ;`,
      [customerId, gameId, daysRented, originalPrice]
    );

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const returnGame = async (req, res) => {
  const { id } = req.params;
  try {
    const validRent = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id]);
    if (validRent.rows.length === 0) return res.sendStatus(404);
    if (validRent.rows[0].returnDate !== null) return res.sendStatus(400);

    console.log(validRent.rows[0]);
    const rent = validRent.rows[0];

    const rentDateMs = new Date(rent.rentDate).getTime();
    const returnDate = new Date().getDate();
    const returnDateMs = new Date().getTime();
    const daysRentedMs = (rent.daysRented * 24 * 60 * 60 * 1000);
    const originalPrice = rent.originalPrice;
    const pricePerDay = originalPrice/rent.daysRented;

    console.log(rentDateMs, returnDateMs, returnDate, daysRentedMs, pricePerDay);

    const fee = Math.floor(Math.abs(rentDateMs - returnDateMs)/(1000*60*60*24) * pricePerDay);

    console.log(fee);

    const gameReturn = await db.query(
      `UPDATE rentals SET "returnDate"=$2, "delayFee"=$3 WHERE id=$1;`,
      [id, returnDate, fee]
    );

    res.sendStatus(200);
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
