import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
    host: process.env.HOST,
    port: process.env.PORTDB,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

export default pool;