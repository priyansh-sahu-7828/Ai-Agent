// src/database/tables/rawInput.table.ts

import pool from '../../config/db.js';

export async function createRawInputsTable() {

  await pool.query(`

    CREATE TABLE IF NOT EXISTS onboarding_raw_inputs (

      id UUID PRIMARY KEY
      DEFAULT gen_random_uuid(),

      client_id UUID NOT NULL
      REFERENCES clients(id)
      ON DELETE CASCADE,

      payload JSONB NOT NULL,

      processed VARCHAR(30)
      DEFAULT 'not_processed'
      CHECK (
        processed IN (
          'processed',
          'not_processed',
          'processing'
        )
      ),

      processing_attempts SMALLINT
      DEFAULT 0,

      last_processing_error TEXT,

      created_at TIMESTAMP WITH TIME ZONE
      DEFAULT CURRENT_TIMESTAMP,

      updated_at TIMESTAMP WITH TIME ZONE
      DEFAULT CURRENT_TIMESTAMP

    );

  `);

  console.log(
    '✅ onboarding_raw_inputs table created'
  );
}