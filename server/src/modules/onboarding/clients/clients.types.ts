// {
//   "company_name": "MedVitals Health Systems",
//   "email": "onboarding@medvitalshealth.com",
//   "industry": "Healthcare"
// }   = example



// src/modules/clients/clients.types.ts
export type OnboardingStatus =
  | 'not_started'
  | 'in_progress'
  | 'completed';

export interface Client {
  id:                UUID;
  company_name:      string;
  email:             string;
  industry:          string | null;
  onboarding_status: OnboardingStatus;
  created_at:        Date;
  updated_at:        Date;
  deleted_at:        Date | null;
}

export interface CreateClientDTO {
  company_name: string;
  email:        string;
  industry?:    string;
}

export interface UpdateClientDTO {
  company_name?:      string;
  industry?:          string;
  onboarding_status?: OnboardingStatus;
}

type UUID = string;