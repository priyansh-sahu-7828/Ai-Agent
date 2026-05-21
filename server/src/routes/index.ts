// src/routes/index.ts

import { Router } from 'express';

import { clientsController }
from '../modules/onboarding/clients/index.js';

import { rawInputController }
from '../modules/onboarding/Raw Input/index.js';

import { fieldSchemaController }
from '../modules/onboarding/field-schema/index.js';

const router = Router();

// ── clients ──────────────────────────────────────
router.post  ('/onboarding/clients',          clientsController.create);
router.get   ('/onboarding/clients/:id',      clientsController.getOne);
router.patch ('/onboarding/clients/:id',      clientsController.update);
router.delete('/onboarding/clients/:id',      clientsController.remove);

// ── RAW INPUT ROUTES ──────────────────────────────────────
router.post   ('/onboarding/raw-input',                  rawInputController.create);
router.get    ('/onboarding/raw-input/:id',              rawInputController.getOne);
router.get    ('/onboarding/raw-input/client/:clientId', rawInputController.getByClient);
router.patch  ('/onboarding/raw-input/:id',              rawInputController.update);
router.patch  ('/onboarding/raw-input/client/:clientId', rawInputController.updateByClient);
router.delete ('/onboarding/raw-input/:id',              rawInputController.remove);
router.delete ('/onboarding/raw-input/client/:clientId', rawInputController.removeByClient);

// ── Field-Schema Routes ──────────────────────────────────────
router.get   ('/field-schemas',                 fieldSchemaController.getAll);
router.get   ('/field-schemas/:id',             fieldSchemaController.getOne);
router.get   ('/field-schemas/key/:fieldKey',   fieldSchemaController.getByKey);
router.post  ('/field-schemas',                 fieldSchemaController.create);
router.patch ('/field-schemas/:id',             fieldSchemaController.update);
router.delete('/field-schemas/:id',             fieldSchemaController.remove);

export default router;