import { RawInputRepository } from './rawInput.repository.js';

import type {
  CreateRawInputDTO,
  UpdateRawInputDTO
} from './rawInput.types.js';

export class RawInputService {

  constructor(
    private repository: RawInputRepository
  ) {}

  async createRawInput(data: CreateRawInputDTO) {
    return this.repository.create(data);
  }

  async getRawInput(id: string) {
    return this.repository.findById(id);
  }

  async getClientRawInputs(clientId: string) {
    return this.repository.findByClientId(clientId);
  }

  async updateRawInput(
    id: string,
    data: UpdateRawInputDTO
  ) {
    return this.repository.update(id, data);
  }

  async updateByClientRawInput(
    clientId: string,
    data: UpdateRawInputDTO
  ) {
    return this.repository.updateByClient(clientId, data);
  }

  async deleteRawInput(id: string) {
    return this.repository.delete(id);
  }

  async deleteByClientRawInput(clientId: string){
    return this.repository.deleteByClient(clientId);
  }
}