// Create PostgreSQL Connection Pool
import * as pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg.default;


const connectionPool = new Pool({
  connectionString:
    `postgresql://${process.env.DBUSERNAME}:${process.env.PASSWORD}@localhost:5432/${process.env.DBNAME}`,
});

export default connectionPool;