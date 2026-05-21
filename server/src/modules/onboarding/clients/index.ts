// src/modules/clients/index.ts — dependency wiring
import pool from '../../../config/db.js';
import { ClientsRepository } from './clients.repository.js';
import { ClientsService } from './clients.service.js';
import { ClientsController } from './clients.controller.js';

const repository  = new ClientsRepository(pool);
const service     = new ClientsService(repository);
export const clientsController = new ClientsController(service);

export { ClientsRepository, ClientsService };