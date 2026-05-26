import {
  FinalStructuredRepository
} from './finalStructured.repository.js';

import type {
  CreateFinalStructuredDTO
} from './finalStructured.types.js';


export class FinalStructuredService {

  constructor(
    private repository =
      new FinalStructuredRepository()
  ) {}

  async create(
    data: CreateFinalStructuredDTO
  ) {

    return this.repository.create(data);
  }

  async getByClientId(
    client_id: string
  ) {

    return this.repository.getByClientId(
      client_id
    );
  }
}