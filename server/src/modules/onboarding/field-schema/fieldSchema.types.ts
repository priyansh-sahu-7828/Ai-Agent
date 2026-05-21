export type FieldType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'array'
  | 'json'
  | 'date';

export type FieldCategory =
  | 'general'
  | 'business'
  | 'communication'
  | 'ai_config';

export interface OnboardingFieldSchema {
  id: string;

  field_key: string;
  field_name: string;
  field_description: string | null;

  field_type: FieldType;

  required: boolean;

  regex_pattern: string | null;

  min_value: number | null;
  max_value: number | null;

  allowed_values: string[] | null;

  extraction_hint: string | null;
  example_value: string | null;

  category: FieldCategory;

  display_order: number;

  is_active: boolean;

  created_at: Date;
  updated_at: Date;
}

export interface CreateFieldSchemaDTO {
  field_key: string;
  field_name: string;
  field_description?: string;

  field_type: FieldType;

  required?: boolean;

  regex_pattern?: string;

  min_value?: number;
  max_value?: number;

  allowed_values?: string[];

  extraction_hint?: string;
  example_value?: string;

  category: FieldCategory;

  display_order?: number;
}

export interface UpdateFieldSchemaDTO {
  field_name?: string;
  field_description?: string;

  field_type?: FieldType;

  required?: boolean;

  regex_pattern?: string;

  min_value?: number;
  max_value?: number;

  allowed_values?: string[];

  extraction_hint?: string;
  example_value?: string;

  category?: FieldCategory;

  display_order?: number;

  is_active?: boolean;
}