import pool from '../../../config/db.js';

import type {
  CreateFinalStructuredDTO
} from './finalStructured.types.js';


export class FinalStructuredRepository {

  async create(
    data: CreateFinalStructuredDTO
  ) {

    const query = `
      
      INSERT INTO final_structured_data (
        client_id,
        structured_data,
        extraction_status,
        extraction_error
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const values = [
      data.client_id,
      JSON.stringify(data.structured_data),
      data.extraction_status || 'completed',
      data.extraction_error || null
    ];

    const result = await pool.query(
      query,
      values
    );

    return result.rows[0];
  }


  async getByClientId(
    client_id: string
  ) {

    const result = await pool.query(
      `
      SELECT *
      FROM final_structured_data
      WHERE client_id = $1
      ORDER BY created_at DESC
      LIMIT 1;
      `,
      [client_id]
    );

    return result.rows[0];
  }
}