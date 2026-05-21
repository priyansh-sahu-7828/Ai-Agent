import pool from '../../config/db.js';

export async function createOnboardingFieldSchemasTable() {

  await pool.query(`
    
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";

    CREATE TABLE IF NOT EXISTS onboarding_field_schemas (

      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

      field_key VARCHAR(100) NOT NULL UNIQUE,

      field_name VARCHAR(255) NOT NULL,

      field_description TEXT,

      field_type VARCHAR(50) NOT NULL DEFAULT 'string',

      required BOOLEAN DEFAULT true,

      regex_pattern VARCHAR(255),

      min_value NUMERIC,

      max_value NUMERIC,

      allowed_values TEXT[],

      extraction_hint TEXT,

      example_value TEXT,

      category VARCHAR(50) NOT NULL DEFAULT 'general',

      display_order SMALLINT NOT NULL DEFAULT 1000,

      is_active BOOLEAN DEFAULT true,

      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

    );

  `);

  console.log(
    'onboarding_field_schemas table created'
  );
}