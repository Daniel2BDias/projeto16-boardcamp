import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { Pool } = pg;

const configDatabase = {
  connectionString: process.env.DATABASE_URL,
  ssl: false
};

if (process.env.NODE_ENV === "production") configDatabase.ssl = true;

const db = new Pool(configDatabase);

db.connect((error, client, done) => {
  if(error){
    console.error("Failed to Connect!", error);
  } else {
    console.log("Connected!");
    done();
  }
});

export default db;