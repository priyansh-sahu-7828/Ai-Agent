import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

// const pool = new Pool({
//   user:     process.env.DB_USER,
//   host:     process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port:     Number(process.env.DB_PORT) || 5432,
//   max:      20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on('error', (err) => {
  console.error('Unexpected pg pool error', err);
  process.exit(-1);
});

export default pool;