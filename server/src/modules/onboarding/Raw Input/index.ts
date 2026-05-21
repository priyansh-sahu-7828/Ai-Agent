import pool from '../../../config/db.js';

import { RawInputRepository }
from './rawInput.repository.js';

import { RawInputService }
from './rawInput.service.js';

import { RawInputController }
from './rawInput.controller.js';

const repository =
  new RawInputRepository();

const service =
  new RawInputService(repository);

export const rawInputController =
  new RawInputController(service);

export {
  RawInputRepository,
  RawInputService
};