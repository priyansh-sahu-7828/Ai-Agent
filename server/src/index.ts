import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import { runMigrations } from './database/runMigrations.js';

import { seedOnboardingFieldSchemas } from './seeds/onboardingFieldSchema.seed.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

const PORT = 3000;

async function startServer() {

  try {

    // ─────────────────────────────
    // CREATE TABLES
    // ─────────────────────────────
    await runMigrations();

    // ─────────────────────────────
    // INSERT DEFAULT DATA
    // ─────────────────────────────
    await seedOnboardingFieldSchemas();

    // ─────────────────────────────
    // START SERVER
    // ─────────────────────────────
    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });

  } catch (error) {

    console.error(
      'Server startup failed:',
      error
    );

    process.exit(1);
  }
}

startServer();