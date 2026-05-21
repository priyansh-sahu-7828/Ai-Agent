import { Pool } from 'pg';

import type {
  CreateFieldSchemaDTO,
  UpdateFieldSchemaDTO
} from './fieldSchema.types.js';

export class FieldSchemaRepository {

  constructor(private pg: Pool) {}

  async create(data: CreateFieldSchemaDTO) {

    const query = `
      INSERT INTO onboarding_field_schemas (
        field_key,
        field_name,
        field_description,
        field_type,
        required,
        regex_pattern,
        min_value,
        max_value,
        allowed_values,
        extraction_hint,
        example_value,
        category,
        display_order
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13
      )
      RETURNING *;
    `;

    const values = [
      data.field_key,
      data.field_name,
      data.field_description,
      data.field_type,
      data.required ?? true,
      data.regex_pattern,
      data.min_value,
      data.max_value,
      data.allowed_values,
      data.extraction_hint,
      data.example_value,
      data.category,
      data.display_order ?? 1000
    ];

    const result = await this.pg.query(query, values);

    return result.rows[0];
  }

  async findAll() {

    const query = `
      SELECT *
      FROM onboarding_field_schemas
      WHERE is_active = true
      ORDER BY display_order ASC;
    `;

    const result = await this.pg.query(query);

    return result.rows;
  }

  async findById(id: string) {

    const query = `
      SELECT *
      FROM onboarding_field_schemas
      WHERE id = $1;
    `;

    const result = await this.pg.query(query, [id]);

    return result.rows[0];
  }

  async findByFieldKey(fieldKey: string) {

    const query = `
      SELECT *
      FROM onboarding_field_schemas
      WHERE field_key = $1;
    `;

    const result = await this.pg.query(query, [fieldKey]);

    return result.rows[0];
  }

  async update(
    id: string,
    data: UpdateFieldSchemaDTO
  ) {

    const fields = [];
    const values = [];

    let index = 1;

    Object.entries(data).forEach(([key, value]) => {

      if (value !== undefined) {

        fields.push(`${key} = $${index}`);

        values.push(value);

        index++;
      }
    });

    fields.push(`updated_at = CURRENT_TIMESTAMP`);

    values.push(id);

    const query = `
      UPDATE onboarding_field_schemas
      SET ${fields.join(', ')}
      WHERE id = $${index}
      RETURNING *;
    `;

    const result = await this.pg.query(query, values);

    return result.rows[0];
  }

  async delete(id: string) {

    const query = `
      DELETE FROM onboarding_field_schemas
      WHERE id = $1;
    `;

    await this.pg.query(query, [id]);
  }
}