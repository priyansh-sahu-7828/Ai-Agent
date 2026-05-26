import { WhatsAppRepository }
from './whatsapp.repository.js';

import { WhatsAppService }
from './whatsapp.service.js';

import { WhatsAppController }
from './whatsapp.controller.js';


const repository =
  new WhatsAppRepository();

const service =
  new WhatsAppService(repository);

export const whatsappController =
  new WhatsAppController(service);