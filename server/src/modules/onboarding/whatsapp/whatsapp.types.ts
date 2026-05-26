export interface WhatsAppAccount {

  id: string;

  client_id: string;

  phone_number: string;

  phone_number_id: string;

  access_token: string;

  business_account_id: string | null;

  created_at: Date;

  updated_at: Date;

  deleted_at: Date | null;
}


export interface CreateWhatsAppAccountDTO {

  client_id: string;

  phone_number: string;

  phone_number_id: string;

  access_token: string;

  business_account_id?: string;
}


export interface UpdateWhatsAppAccountDTO {

  phone_number?: string;

  phone_number_id?: string;

  access_token?: string;

  business_account_id?: string;
}