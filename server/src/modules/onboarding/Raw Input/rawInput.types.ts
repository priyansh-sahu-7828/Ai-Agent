export type ProcessingStatus =
  | 'processed'
  | 'not_processed'
  | 'processing';

export interface OnboardingRawInput {
  id: string;
  client_id: string;

  payload: Record<string, any>;

  processed: ProcessingStatus;
  processing_attempts: number;
  last_processing_error: string | null;

  created_at: Date;
  updated_at: Date;
}

export interface CreateRawInputDTO {
  client_id: string;
  payload: Record<string, any>;
}

export interface UpdateRawInputDTO {
  processed?: ProcessingStatus;
  processing_attempts?: number;
  last_processing_error?: string | null;
  payload?: Record<string, any>;
}


// EXAMPLE JSON

// {
//   "client_id": "399d11f4-94d4-4ae9-ad2e-7c1ba8af78ec",
//   "payload": {
//     "files": [
//       {
//         "id": "att_66fe1892_bc31_4999_ba7c_5b8801d99ef1",
//         "file_name": "medvitals_internal_triage_v4.pdf",
//         "mime_type": "application/pdf",
//         "url": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
//       },
//       {
//         "id": "att_77aa2901_df42_4811_bc8d_6c9902e00fa2",
//         "file_name": "clinic_faq_and_core_services.pdf",
//         "mime_type": "application/pdf",
//         "url": "https://www.orimi.com/pdf-test.pdf"
//       }
//     ],
//     "text": "MEDVITALS HEALTH SYSTEMS INTAKE RULES & FAQ.\nWelcome to MedVitals. We operate major clinics across the tri-state area. Our primary medical services encompass General Cardiology, Outpatient Pediatrics, and Family Medicine. Our operations team needs the assistant to follow strict behavior. Tone must remain completely empathetic, calm, and professional at all times—never speak casually or sound rushed. Patients might be in distress.\n\nCRITICAL TRIAGE SAFETY: If an end-user mentions experiencing severe chest pain, severe shortness of breath, or sudden slurred speech, the agent must STOP whatever it is doing immediately, provide no booking options, and say: 'Please hang up and dial 911 or proceed to the nearest emergency room immediately. I am transferring you to our nurse line now.' and trigger the system flag for human handoff.\n\nScheduling slots: Appointments can be booked for standard consults (30 mins) or follow-ups (15 mins). We integrate directly with our legacy system backend via Epic FHIR servers. Our global scheduling portal is located at https://fhir.medvitals.org/R4/Appointment. Send automated text message confirmations to patients after every successful reservation."
//   }
// }