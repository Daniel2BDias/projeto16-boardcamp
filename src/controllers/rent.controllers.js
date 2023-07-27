import db from "../database/postgreSQL.database.js";

export const getRents = async (req, res) => {

    try{
        const rents = await db.query(`SELECT * FROM rentals;`);
        res.status(200).send(rents.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const registerNewRent = async (req, res) => {

    try{

    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const returnGame = async (req, res) => {

    try{

    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const deleteRentalEntry = async (req, res) => {

    try{

    } catch (error) {
        res.status(500).send(error.message);
    }
};