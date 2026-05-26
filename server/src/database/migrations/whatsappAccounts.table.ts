import pool from '../../config/db.js';

export async function createWhatsAppAccountsTable() {

  const query = `

    CREATE EXTENSION IF NOT EXISTS "pgcrypto";

    CREATE TABLE IF NOT EXISTS whatsapp_accounts (

      id UUID PRIMARY KEY
      DEFAULT gen_random_uuid(),

      client_id UUID NOT NULL,

      phone_number VARCHAR(30) NOT NULL,

      phone_number_id VARCHAR(255)
      NOT NULL UNIQUE,

      access_token TEXT NOT NULL,

      business_account_id VARCHAR(255),

      created_at TIMESTAMP DEFAULT NOW(),

      updated_at TIMESTAMP DEFAULT NOW(),

      deleted_at TIMESTAMP NULL,

      CONSTRAINT fk_client
      FOREIGN KEY (client_id)
      REFERENCES clients(id)
      ON DELETE CASCADE
    );
  `;

  await pool.query(query);

  console.log(
    'WhatsApp Accounts table created'
  );
}