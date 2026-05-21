import pool from '../../../config/db.js';
import { FieldSchemaRepository } from './fieldSchema.repository.js';
import { FieldSchemaController } from './fieldSchema.controller.js';

const repository  = new FieldSchemaRepository(pool);
export const fieldSchemaController = new FieldSchemaController(repository);

export { FieldSchemaRepository };