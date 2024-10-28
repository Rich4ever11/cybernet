import pg from "pg";
import "./dotenv.js";

const config = {
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  host: process.env.RDS_HOSTNAME,
  port: process.env.RDS_PORT,
  database: process.env.RDS_DATABASE,
};

export const pool = new pg.Pool(config);
