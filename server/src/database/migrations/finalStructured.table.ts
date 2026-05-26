import pool from '../../config/db.js';

export async function createFinalStructuredTable() {

  await pool.query(`
    
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";

    CREATE TABLE IF NOT EXISTS final_structured_data (

      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

      client_id UUID NOT NULL REFERENCES clients(id)
      ON DELETE CASCADE,

      structured_data JSONB NOT NULL,

      extraction_status VARCHAR(20)
      DEFAULT 'completed',

      extraction_error TEXT,

      created_at TIMESTAMP DEFAULT NOW(),

      updated_at TIMESTAMP DEFAULT NOW()
    );

  `);

  console.log(
    'final_structured_data table ready'
  );
}