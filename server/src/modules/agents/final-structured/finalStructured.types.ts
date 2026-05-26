export interface FinalStructuredData {
  id: string;

  client_id: string;

  structured_data: Record<string, any>;

  extraction_status:
    | 'pending'
    | 'completed'
    | 'failed';

  extraction_error: string | null;

  created_at: Date;
  updated_at: Date;
}

export interface CreateFinalStructuredDTO {
  client_id: string;

  structured_data: Record<string, any>;

  extraction_status?: 'pending' | 'completed' | 'failed';

  extraction_error?: string | null;
}