// src/database/tables/client.table.ts

import pool from '../../config/db.js';

export async function createClientsTable() {
  await pool.query(`
    
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";

    CREATE TABLE IF NOT EXISTS clients (

      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

      company_name VARCHAR(255) NOT NULL,

      email VARCHAR(255) UNIQUE NOT NULL,

      industry VARCHAR(255),

      onboarding_status VARCHAR(50)
      DEFAULT 'not_started'
      CHECK (
        onboarding_status IN (
          'not_started',
          'in_progress',
          'completed'
        )
      ),

      created_at TIMESTAMP WITH TIME ZONE
      DEFAULT CURRENT_TIMESTAMP,

      updated_at TIMESTAMP WITH TIME ZONE
      DEFAULT CURRENT_TIMESTAMP,

      deleted_at TIMESTAMP WITH TIME ZONE

    );

  `);

  console.log('✅ clients table created');
}