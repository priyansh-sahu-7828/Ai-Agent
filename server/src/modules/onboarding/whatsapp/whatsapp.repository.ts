import pool from '../../../config/db.js';

import type {
  CreateWhatsAppAccountDTO,
  UpdateWhatsAppAccountDTO
} from './whatsapp.types.js';


export class WhatsAppRepository {

  async create(
    data: CreateWhatsAppAccountDTO
  ) {

    const query = `
      
      INSERT INTO whatsapp_accounts (

        client_id,

        phone_number,

        phone_number_id,

        access_token,

        business_account_id

      )

      VALUES ($1, $2, $3, $4, $5)

      RETURNING *
    `;

    const values = [

      data.client_id,

      data.phone_number,

      data.phone_number_id,

      data.access_token,

      data.business_account_id || null
    ];

    const result =
      await pool.query(query, values);

    return result.rows[0];
  }


  async getByClientId(
    clientId: string
  ) {

    const query = `
      
      SELECT *
      FROM whatsapp_accounts
      WHERE client_id = $1
      AND deleted_at IS NULL
    `;

    const result =
      await pool.query(query, [clientId]);

    return result.rows;
  }


  async getByPhoneNumberId(
    phoneNumberId: string
  ) {

    const query = `
      
      SELECT *
      FROM whatsapp_accounts
      WHERE phone_number_id = $1
      AND deleted_at IS NULL
      LIMIT 1
    `;

    const result =
      await pool.query(
        query,
        [phoneNumberId]
      );

    return result.rows[0];
  }


  async update(
    id: string,
    data: UpdateWhatsAppAccountDTO
  ) {

    const fields = [];

    const values = [];

    let index = 1;

    for (const [key, value] of Object.entries(data)) {

      fields.push(`${key} = $${index}`);

      values.push(value);

      index++;
    }

    values.push(id);

    const query = `
      
      UPDATE whatsapp_accounts
      SET
        ${fields.join(', ')},
        updated_at = NOW()
      WHERE id = $${index}
      RETURNING *
    `;

    const result =
      await pool.query(query, values);

    return result.rows[0];
  }


  async delete(id: string) {

    const query = `
      
      UPDATE whatsapp_accounts
      SET deleted_at = NOW()
      WHERE id = $1
    `;

    await pool.query(query, [id]);

    return true;
  }
}