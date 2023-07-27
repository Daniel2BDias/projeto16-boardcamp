import db from "../database/postgreSQL.database.js";

export const getGames = async (req, res) => {

    try{
        const games = db.query(`SELECT * FROM games;`);
        res.status(200).send(games.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const registerNewGame = async (req, res) => {
    const {name, image, stockTotal, pricePerDay} = req.body;

    try{
        const alreadyRegistered = await db.query(`SELECT * FROM games WHERE name=$1`, [name]);
        if (alreadyRegistered.rows[0].name === name) return res.sendStatus(409);

        await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)`, [name, image, stockTotal, pricePerDay]);
        res.sendStatus(201); 
    } catch (error) {
        res.status(500).send(error.message);
    }
};