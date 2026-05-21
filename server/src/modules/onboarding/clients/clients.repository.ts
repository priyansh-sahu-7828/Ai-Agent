// src/modules/clients/clients.repository.ts
import { Pool } from 'pg';
import type { Client, CreateClientDTO, UpdateClientDTO } from './clients.types.js';

export class ClientsRepository {
  constructor(private pg: Pool) {}

  async create(data: CreateClientDTO): Promise<Client> {
    const { rows } = await this.pg.query(
      `INSERT INTO clients (company_name, email, industry)
       VALUES ($1, $2, $3) RETURNING *`,
      [data.company_name, data.email, data.industry ?? null]
    );
    return rows[0];
  }

  async findById(id: string): Promise<Client | null> {
    const { rows } = await this.pg.query(
      `SELECT * FROM clients WHERE id = $1 AND deleted_at IS NULL`,
      [id]
    );
    return rows[0] ?? null;
  }

  async findByEmail(email: string): Promise<Client | null> {
    const { rows } = await this.pg.query(
      `SELECT * FROM clients WHERE email = $1 AND deleted_at IS NULL`,
      [email]
    );
    return rows[0] ?? null;
  }

  async update(id: string, data: UpdateClientDTO): Promise<Client> {
    const { rows } = await this.pg.query(
      `UPDATE clients
       SET company_name      = COALESCE($1, company_name),
           industry          = COALESCE($2, industry),
           onboarding_status = COALESCE($3, onboarding_status),
           updated_at        = NOW()
       WHERE id = $4 RETURNING *`,
      [data.company_name, data.industry, data.onboarding_status, id]
    );
    return rows[0];
  }

  async softDelete(id: string): Promise<void> {
    await this.pg.query(
      `UPDATE clients SET deleted_at = NOW() WHERE id = $1`, [id]
    );
  }
}