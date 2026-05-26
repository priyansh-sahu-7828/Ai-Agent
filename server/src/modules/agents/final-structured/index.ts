import {
  FinalStructuredRepository
} from './finalStructured.repository.js';

import {
  FinalStructuredService
} from './finalStructured.service.js';

import {
  FinalStructuredController
} from './finalStructured.controller.js';


const repository =
  new FinalStructuredRepository();

const service =
  new FinalStructuredService(
    repository
  );

export const finalStructuredController =
  new FinalStructuredController(
    service
  );