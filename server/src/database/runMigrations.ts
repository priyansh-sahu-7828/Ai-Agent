// src/database/runMigrations.ts

import { createClientsTable }
from './migrations/clients.table.js';

import { createRawInputsTable }
from './migrations/rawInputs.table.js';

import { createOnboardingFieldSchemasTable }
from './migrations/onboardingFieldSchemas.table.js';

export async function runMigrations() {

  try {

    // ─────────────────────────────────────
    // Create tables in dependency order
    // ─────────────────────────────────────

    await createClientsTable();

    await createRawInputsTable();

    await createOnboardingFieldSchemasTable();

    console.log(
      '✅ All migrations completed successfully'
    );

  } catch (error) {

    console.error(
      '❌ Migration failed:',
      error
    );

    process.exit(1);
  }
}