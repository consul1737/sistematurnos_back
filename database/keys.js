import { Pool } from "pg";
const pool = new Pool({
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password :'123',
    database: 'lumina'
})

module.exports = pool; 