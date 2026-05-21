// src/modules/clients/clients.service.ts
import { ClientsRepository } from './clients.repository.js';
import type { CreateClientDTO, UpdateClientDTO } from './clients.types.js';
import { AppError } from '../../../shared/errors/AppError.js';

export class ClientsService {
  constructor(private repo: ClientsRepository) {}

  async createClient(data: CreateClientDTO) {
    const existing = await this.repo.findByEmail(data.email);
    if (existing) throw new AppError('Email already registered', 409);
    return this.repo.create(data);
  }

  async getClient(id: string) {
    const client = await this.repo.findById(id);
    if (!client) throw new AppError('Client not found', 404);
    return client;
  }

  async updateClient(id: string, data: UpdateClientDTO) {
    await this.getClient(id); // ensures exists
    return this.repo.update(id, data);
  }

  async deleteClient(id: string) {
    await this.getClient(id);
    await this.repo.softDelete(id);
  }
}