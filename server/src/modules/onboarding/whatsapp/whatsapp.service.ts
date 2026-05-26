import { WhatsAppRepository }
from './whatsapp.repository.js';

import type {
  CreateWhatsAppAccountDTO,
  UpdateWhatsAppAccountDTO
} from './whatsapp.types.js';


export class WhatsAppService {

  constructor(
    private repository =
      new WhatsAppRepository()
  ) {}


  async create(
    data: CreateWhatsAppAccountDTO
  ) {

    return await this.repository.create(data);
  }


  async getByClientId(
    clientId: string
  ) {

    return await this.repository.getByClientId(
      clientId
    );
  }


  async getByPhoneNumberId(
    phoneNumberId: string
  ) {

    return await this.repository.getByPhoneNumberId(
      phoneNumberId
    );
  }


  async update(
    id: string,
    data: UpdateWhatsAppAccountDTO
  ) {

    return await this.repository.update(
      id,
      data
    );
  }


  async delete(id: string) {

    return await this.repository.delete(id);
  }
}