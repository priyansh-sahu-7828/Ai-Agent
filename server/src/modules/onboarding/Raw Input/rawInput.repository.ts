import pool from '../../../config/db.js';

import type {
  CreateRawInputDTO,
  UpdateRawInputDTO
} from './rawInput.types.js';

export class RawInputRepository {

  async create(data: CreateRawInputDTO) {
    const query = `
      INSERT INTO onboarding_raw_inputs (
        client_id,
        payload
      )
      VALUES ($1, $2)
      RETURNING *;
    `;

    const values = [
      data.client_id,
      JSON.stringify(data.payload)
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
  }

  async findById(id: string) {
    const query = `
      SELECT *
      FROM onboarding_raw_inputs
      WHERE id = $1;
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0];
  }

  async findByClientId(clientId: string) {
    const query = `
      SELECT *
      FROM onboarding_raw_inputs
      WHERE client_id = $1
      ORDER BY created_at DESC;
    `;

    const result = await pool.query(query, [clientId]);

    return result.rows;
  }

  async update(id: string, data: UpdateRawInputDTO) {

    const query = `
      UPDATE onboarding_raw_inputs
      SET
        payload = COALESCE($1, payload),
        processed = COALESCE($2, processed),
        processing_attempts = COALESCE($3, processing_attempts),
        last_processing_error = COALESCE($4, last_processing_error),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING *;
    `;

    const values = [
      data.payload ? JSON.stringify(data.payload) : null,
      data.processed,
      data.processing_attempts,
      data.last_processing_error,
      id
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
  }

  async updateByClient(clientId: string, data: UpdateRawInputDTO) {

    const query = `
      UPDATE onboarding_raw_inputs
      SET
        payload = COALESCE($1, payload),
        processed = COALESCE($2, processed),
        processing_attempts = COALESCE($3, processing_attempts),
        last_processing_error = COALESCE($4, last_processing_error),
        updated_at = CURRENT_TIMESTAMP
      WHERE client_id = $5
      RETURNING *;
    `;

    const values = [
      data.payload ? JSON.stringify(data.payload) : null,
      data.processed,
      data.processing_attempts,
      data.last_processing_error,
      clientId
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
  }

  async delete(id: string) {
    const query = `
      DELETE FROM onboarding_raw_inputs
      WHERE id = $1;
    `;

    await pool.query(query, [id]);
  }

  async deleteByClient(clientId: string) {
    const query = `
      DELETE FROM onboarding_raw_inputs
      WHERE client_id = $1;
    `;

    await pool.query(query, [clientId]);
  }
}