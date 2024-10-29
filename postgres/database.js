import pg from "pg";
import "./dotenv.js";

const config = {
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOSTNAME,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE,
};

export const pool = new pg.Pool(config);
