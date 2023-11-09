import mysql2 from 'mysql2';
import dotenv from "dotenv";

dotenv.config();

const sql = mysql2.createConnection(
    {
        database: process.env.sqldb,
        host: process.env.sqlhost,
        password: process.env.sqlpass,
        user: process.env.sqlusr
    }
)

export default sql;