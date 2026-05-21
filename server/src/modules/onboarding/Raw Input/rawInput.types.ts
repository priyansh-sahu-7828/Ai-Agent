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