import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.VERCELDB_URL + "?sslmode=require",
})