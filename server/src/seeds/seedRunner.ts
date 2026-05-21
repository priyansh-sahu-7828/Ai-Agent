import { seedOnboardingFieldSchemas }
from '../seeds/onboardingFieldSchema.seed.js';

async function runSeeds() {

  try {

    await seedOnboardingFieldSchemas();

    console.log('All seeds executed');

    process.exit(0);

  } catch (error) {

    console.error(error);

    process.exit(1);
  }
}

runSeeds();