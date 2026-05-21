import pool from '../config/db.js';

export type FieldType = 'string' | 'number' | 'boolean' | 'json' | 'array';
export type FieldCategory =
  | 'general'
  | 'business'
  | 'communication'
  | 'ai_config'
  | 'services'
  | 'escalation'
  | 'compliance';

export interface OnboardingFieldSchema {
  field_key: string;
  field_name: string;
  field_description: string;
  field_type: FieldType;
  required: boolean;
  extraction_hint: string;
  example_value: string;
  category: FieldCategory;
  display_order: number;
}

export const seedData: OnboardingFieldSchema[] = [

  // ============================================================
  // CATEGORY: general  (Who they are)
  // ============================================================
  {
    field_key: 'company_name',
    field_name: 'Company Name',
    field_description: 'Official legal business name',
    field_type: 'string',
    required: true,
    extraction_hint:
      'Look for the exact business name on letterheads, email signatures, "we are", "our company is", "welcome to", or legal footers. ' +
      'Prefer the full legal name (e.g., "Smith & Sons LLC") over informal abbreviations.',
    example_value: 'Acme Dental Care LLC',
    category: 'general',
    display_order: 1,
  },

  {
    field_key: 'industry',
    field_name: 'Industry / Niche',
    field_description: 'Primary industry this business operates in',
    field_type: 'string',
    required: true,
    extraction_hint:
      'Identify the industry from service descriptions, product names, or explicit statements like "we are a dental clinic" or "we provide legal services". ' +
      'Normalize to a single lowercase keyword: healthcare, legal, real-estate, hospitality, consulting, retail, saas, finance, fitness, education, automotive, insurance, e-commerce, logistics.',
    example_value: 'healthcare',
    category: 'general',
    display_order: 2,
  },

  {
    field_key: 'business_description',
    field_name: 'Business Description',
    field_description: 'Concise description of what the business does and who it serves',
    field_type: 'string',
    required: true,
    extraction_hint:
      'Extract the core mission or purpose statement. Look for "we provide", "we help", "our services include", "we specialize in", ' +
      '"about us" sections, or introductory paragraphs. Aim for 1–3 sentences that clearly explain what the business does, for whom, and the value it delivers.',
    example_value: 'We provide comprehensive dental care including cleanings, fillings, and orthodontics to families in the Austin metro area.',
    category: 'general',
    display_order: 3,
  },

  {
    field_key: 'target_audience',
    field_name: 'Target Audience',
    field_description: 'Description of the ideal customer or client persona',
    field_type: 'string',
    required: true,
    extraction_hint:
      'Look for phrases like "we serve", "our clients are", "designed for", "ideal for", "target market". ' +
      'Capture demographics, profession, need, or pain point. If not explicit, infer from the service description (e.g., a pediatric clinic serves children and parents).',
    example_value: 'Families with children aged 0–18 and adults seeking preventive dental care.',
    category: 'general',
    display_order: 4,
  },

  {
    field_key: 'unique_value_proposition',
    field_name: 'Unique Value Proposition',
    field_description: 'What makes this business different from competitors?',
    field_type: 'string',
    required: false,
    extraction_hint:
      'Look for "what sets us apart", "why choose us", "unlike others", "we are the only", differentiators listed in marketing copy, ' +
      'or any claim about speed, price, quality, specialization, or awards. Summarize in 1–2 sentences.',
    example_value: 'Only clinic in the area offering same-day emergency appointments with a board-certified orthodontist on staff.',
    category: 'general',
    display_order: 5,
  },

  // ============================================================
  // CATEGORY: business  (How to reach & operate)
  // ============================================================
  {
    field_key: 'primary_contact_name',
    field_name: 'Primary Contact Name',
    field_description: 'Full name of the main point of contact for this account',
    field_type: 'string',
    required: true,
    extraction_hint:
      'Look for the owner, founder, office manager, or account holder name. Check email sign-offs, "submitted by", "contact:", or document headers. ' +
      'If multiple people are listed, prefer the person who signed or submitted the document.',
    example_value: 'Dr. Sarah Johnson',
    category: 'business',
    display_order: 10,
  },

  {
    field_key: 'primary_contact_email',
    field_name: 'Contact Email',
    field_description: 'Email address of the primary contact',
    field_type: 'string',
    required: true,
    extraction_hint:
      'Extract any email address. Prefer a personal business email (e.g., sarah@clinic.com) over generic inboxes (info@, contact@). ' +
      'Validate that it contains "@" and a domain. Normalize to lowercase.',
    example_value: 'sarah@johnsondental.com',
    category: 'business',
    display_order: 11,
  },

  {
    field_key: 'primary_contact_phone',
    field_name: 'Contact Phone',
    field_description: 'Direct phone number for the primary contact',
    field_type: 'string',
    required: true,
    extraction_hint:
      'Extract any phone number. Formats vary: +1-555-0123, (555) 012-3456, 555.012.3456. ' +
      'Prefer mobile/direct over main reception if both are listed. Normalize to E.164 format: +15550123456.',
    example_value: '+15125550199',
    category: 'business',
    display_order: 12,
  },

  {
    field_key: 'business_phone',
    field_name: 'Business Phone (Main Line)',
    field_description: 'Main public phone number customers call',
    field_type: 'string',
    required: false,
    extraction_hint:
      'Look for "main office", "call us at", "reception", or numbers listed in the header/footer of documents. ' +
      'This is distinct from the personal contact phone — it is the number that will ring at the business. Normalize to E.164 format.',
    example_value: '+15125550100',
    category: 'business',
    display_order: 13,
  },

  {
    field_key: 'website_url',
    field_name: 'Website URL',
    field_description: 'Main company website',
    field_type: 'string',
    required: false,
    extraction_hint:
      'Look for URLs starting with "www.", "http://", "https://", or domain patterns like "company.com". ' +
      'Normalize to include https:// prefix. If only a domain is given (e.g., "johnsondental.com"), prepend "https://".',
    example_value: 'https://johnsondental.com',
    category: 'business',
    display_order: 14,
  },

  {
    field_key: 'physical_address',
    field_name: 'Physical Address',
    field_description: 'Street address of the business location',
    field_type: 'string',
    required: false,
    extraction_hint:
      'Extract full address: street number, street name, suite/unit, city, state, ZIP/postal code, and country. ' +
      'Look in letterheads, footers, "visit us at", "our office is located at". Format as a single string.',
    example_value: '1234 Oak Street, Suite 200, Austin, TX 78701, USA',
    category: 'business',
    display_order: 15,
  },

  {
    field_key: 'operating_hours',
    field_name: 'Operating Hours',
    field_description: 'Days and hours the business is open',
    field_type: 'json',
    required: true,
    extraction_hint:
      'Extract hours for each day. Look for "open Monday–Friday 9am–5pm", "closed weekends", "24/7", specific day listings. ' +
      'Return as JSON where each day key maps to { start: "HH:MM", end: "HH:MM", open: boolean } in 24-hour format. ' +
      'Days: monday, tuesday, wednesday, thursday, friday, saturday, sunday. ' +
      'If business says "closed on Sundays", set open: false with no start/end.',
    example_value: JSON.stringify({
      monday:    { start: '09:00', end: '17:00', open: true  },
      tuesday:   { start: '09:00', end: '17:00', open: true  },
      wednesday: { start: '09:00', end: '19:00', open: true  },
      thursday:  { start: '09:00', end: '17:00', open: true  },
      friday:    { start: '09:00', end: '15:00', open: true  },
      saturday:  { start: '10:00', end: '13:00', open: true  },
      sunday:    { open: false },
    }),
    category: 'business',
    display_order: 16,
  },

  {
    field_key: 'timezone',
    field_name: 'Timezone',
    field_description: 'IANA timezone identifier for the business location',
    field_type: 'string',
    required: true,
    extraction_hint:
      'Extract or infer the timezone from the address, phone area code, or an explicit mention. ' +
      'Use IANA format: America/New_York, America/Chicago, America/Denver, America/Los_Angeles, Europe/London, Asia/Kolkata, etc. ' +
      'If address is in Texas → America/Chicago; California → America/Los_Angeles; New York → America/New_York.',
    example_value: 'America/Chicago',
    category: 'business',
    display_order: 17,
  },

  {
    field_key: 'after_hours_handling',
    field_name: 'After-Hours Handling',
    field_description: 'What should the agent do when called outside business hours?',
    field_type: 'string',
    required: true,
    extraction_hint:
      'Look for instructions like "if called after hours, take a message", "direct to voicemail", "emergency line is X", ' +
      '"we have 24/7 support". Summarize the expected behavior. If not specified, default to "take_message".',
    example_value: 'Take a message with caller name, phone, and reason. Inform them office opens at 9am next business day.',
    category: 'business',
    display_order: 18,
  },

  // ============================================================
  // CATEGORY: services  (What the agent needs to know)
  // ============================================================
  {
    field_key: 'services_offered',
    field_name: 'Services Offered',
    field_description: 'Complete list of services or products the business provides',
    field_type: 'array',
    required: true,
    extraction_hint:
      'Extract every service, product, or offering mentioned. Look for "our services", "we offer", bulleted lists, ' +
      '"service menu", pricing tables, or FAQ items that mention specific services. ' +
      'Return as an array of short strings. Do not duplicate entries.',
    example_value: JSON.stringify(['teeth cleaning', 'fillings', 'teeth whitening', 'orthodontics', 'emergency dental']),
    category: 'services',
    display_order: 20,
  },

  {
    field_key: 'service_areas',
    field_name: 'Service Areas / Locations',
    field_description: 'Geographic areas the business serves',
    field_type: 'array',
    required: false,
    extraction_hint:
      'Look for "we serve", "serving X area", "locations in", city/state names listed as coverage areas. ' +
      'For local businesses extract city/neighborhood names; for national businesses extract state or region names.',
    example_value: JSON.stringify(['Austin, TX', 'Round Rock, TX', 'Cedar Park, TX']),
    category: 'services',
    display_order: 21,
  },

  {
    field_key: 'pricing_overview',
    field_name: 'Pricing Overview',
    field_description: 'General pricing structure or ranges for main services',
    field_type: 'json',
    required: false,
    extraction_hint:
      'Extract any pricing mentioned: per-service, subscription tiers, consultation fees, starting prices. ' +
      'Return as a JSON object keyed by service name with price value as string. ' +
      'If only "starting from $X" is given, use that. Skip if no pricing info exists.',
    example_value: JSON.stringify({ 'teeth cleaning': '$89', 'whitening': 'from $199', 'consultation': 'free' }),
    category: 'services',
    display_order: 22,
  },

  {
    field_key: 'booking_method',
    field_name: 'Appointment / Booking Method',
    field_description: 'How do customers schedule appointments or make bookings?',
    field_type: 'string',
    required: true,
    extraction_hint:
      'Look for "book online at", "call to schedule", "use our app", "walk-ins welcome", "booking link", calendar software names ' +
      '(Calendly, Zocdoc, OpenTable, etc.). Summarize the preferred method and include any URLs or tool names.',
    example_value: 'Patients book via Zocdoc at zocdoc.com/johnsondental or by calling the front desk.',
    category: 'services',
    display_order: 23,
  },

  {
    field_key: 'insurance_accepted',
    field_name: 'Insurance / Payment Accepted',
    field_description: 'Insurance plans or payment methods the business accepts',
    field_type: 'array',
    required: false,
    extraction_hint:
      'Look for "we accept", "insurance plans", "payment options", "we take Delta Dental, Cigna", etc. ' +
      'Also capture payment methods: cash, credit cards, financing. Return as an array of strings.',
    example_value: JSON.stringify(['Delta Dental', 'Cigna', 'Aetna', 'Visa', 'Mastercard', 'CareCredit']),
    category: 'services',
    display_order: 24,
  },

  {
    field_key: 'faqs',
    field_name: 'Frequently Asked Questions',
    field_description: 'Common questions and their answers the agent should know',
    field_type: 'json',
    required: false,
    extraction_hint:
      'Look for any FAQ section, "common questions", help center content, or repeated customer questions mentioned in the document. ' +
      'Return as an array of { question: string, answer: string } objects. Limit to the top 10 most relevant.',
    example_value: JSON.stringify([
      { question: 'Do you accept walk-ins?', answer: 'Yes, we accept walk-ins Monday–Friday until 4pm, subject to availability.' },
      { question: 'How long is a cleaning appointment?', answer: 'A standard cleaning takes approximately 45–60 minutes.' },
    ]),
    category: 'services',
    display_order: 25,
  },

  // ============================================================
  // CATEGORY: communication  (Agent tone & channels)
  // ============================================================
  {
    field_key: 'communication_channels',
    field_name: 'Communication Channels',
    field_description: 'Which channels should the AI agent handle?',
    field_type: 'array',
    required: true,
    extraction_hint:
      'Look for "we use phone", "we respond via email", "live chat", "WhatsApp", "SMS/text". ' +
      'Normalize to: phone, email, chat, sms, whatsapp. Return only channels explicitly mentioned or clearly intended.',
    example_value: JSON.stringify(['phone', 'email']),
    category: 'communication',
    display_order: 30,
  },

  {
    field_key: 'preferred_language',
    field_name: 'Preferred Language(s)',
    field_description: 'Language(s) the agent should communicate in',
    field_type: 'array',
    required: true,
    extraction_hint:
      'Look for "English only", "bilingual", "we serve Spanish-speaking patients", "agent should speak X". ' +
      'If not specified, default to ["English"]. Use ISO 639-1 language names (English, Spanish, French, Hindi, etc.).',
    example_value: JSON.stringify(['English', 'Spanish']),
    category: 'communication',
    display_order: 31,
  },

  {
    field_key: 'tone_of_voice',
    field_name: 'Tone of Voice',
    field_description: 'Personality and communication style the agent should embody',
    field_type: 'string',
    required: true,
    extraction_hint:
      'Look for explicit tone instructions: "be professional", "friendly and warm", "formal", "casual", "empathetic". ' +
      'Also infer from brand language — luxury brands suggest formal/polished, children\'s services suggest warm/cheerful. ' +
      'Choose ONE primary tone: professional, friendly, formal, casual, empathetic, authoritative, playful.',
    example_value: 'friendly and empathetic',
    category: 'communication',
    display_order: 32,
  },

  {
    field_key: 'agent_greeting_script',
    field_name: 'Agent Greeting Script',
    field_description: 'Exact or template greeting the agent should use when answering',
    field_type: 'string',
    required: false,
    extraction_hint:
      'Look for "answer with", "greet callers by saying", "opening script", sample call scripts, or any scripted phrases provided. ' +
      'If not given, construct a greeting using company_name and tone_of_voice: "Thank you for calling [Company], this is your virtual assistant. How can I help you today?"',
    example_value: 'Thank you for calling Johnson Dental Care! This is your virtual assistant. How can I help you today?',
    category: 'communication',
    display_order: 33,
  },

  {
    field_key: 'topics_to_avoid',
    field_name: 'Topics to Avoid',
    field_description: 'Subjects the agent should never discuss or comment on',
    field_type: 'array',
    required: false,
    extraction_hint:
      'Look for "do not discuss", "avoid mentioning", "never talk about", "off-limits topics", competitor names to avoid, ' +
      'legal disclaimers about what staff cannot advise on (e.g., "do not give medical advice", "do not discuss pricing without consultation"). ' +
      'Return as an array of short descriptive strings.',
    example_value: JSON.stringify(['competitor pricing', 'specific diagnoses', 'legal or insurance disputes']),
    category: 'communication',
    display_order: 34,
  },

  // ============================================================
  // CATEGORY: escalation  (Human handoff rules)
  // ============================================================
  {
    field_key: 'handle_escalation',
    field_name: 'Enable Human Escalation',
    field_description: 'Should the agent be able to transfer or escalate to a human?',
    field_type: 'boolean',
    required: true,
    extraction_hint:
      'Look for "transfer to a human", "escalate to manager", "speak with a real person", "warm transfer", ' +
      '"live agent available". If any escalation path is mentioned, set to true.',
    example_value: 'true',
    category: 'escalation',
    display_order: 40,
  },

  {
    field_key: 'escalation_triggers',
    field_name: 'Escalation Triggers',
    field_description: 'Situations that should cause the agent to escalate to a human',
    field_type: 'array',
    required: false,
    extraction_hint:
      'Look for conditions like "if caller is upset", "for billing disputes", "medical emergencies", "complaints", ' +
      '"VIP clients", "press inquiries". Return as an array of trigger descriptions.',
    example_value: JSON.stringify([
      'caller expresses frustration or anger',
      'medical or dental emergency reported',
      'billing dispute or complaint',
      'request for a specific doctor by name',
    ]),
    category: 'escalation',
    display_order: 41,
  },

  {
    field_key: 'escalation_contact',
    field_name: 'Escalation Contact',
    field_description: 'Phone number, extension, or name to transfer escalated calls to',
    field_type: 'string',
    required: false,
    extraction_hint:
      'Look for "transfer to ext. 102", "call manager at X", "escalate to Sarah at Y number". ' +
      'Extract the name, phone number, or extension. If a department is given (e.g., "billing department"), capture that.',
    example_value: 'Front desk: ext. 100 | Manager: Dr. Johnson ext. 201',
    category: 'escalation',
    display_order: 42,
  },

  {
    field_key: 'voicemail_instructions',
    field_name: 'Voicemail / Message-Taking Instructions',
    field_description: 'What information should the agent collect when taking a message?',
    field_type: 'json',
    required: false,
    extraction_hint:
      'Look for "when taking a message, collect", "ask for name and number", "required callback info". ' +
      'Return as { fields_to_collect: string[], delivery_method: string } where delivery_method is: email, sms, crm, or voicemail.',
    example_value: JSON.stringify({
      fields_to_collect: ['caller full name', 'callback phone number', 'reason for calling', 'preferred callback time'],
      delivery_method: 'email',
    }),
    category: 'escalation',
    display_order: 43,
  },

  // ============================================================
  // CATEGORY: ai_config  (Agent behavior & limits)
  // ============================================================
  {
    field_key: 'main_agent_responsibilities',
    field_name: 'Agent Primary Responsibilities',
    field_description: 'Core tasks the AI agent is expected to perform',
    field_type: 'array',
    required: true,
    extraction_hint:
      'Look for "the agent should", "we need the AI to", "main purpose is", task lists in the onboarding form. ' +
      'Normalize to known task types: answer_calls, schedule_appointments, handle_inquiries, take_messages, ' +
      'provide_directions, handle_complaints, send_confirmations, qualify_leads, collect_payments.',
    example_value: JSON.stringify(['answer_calls', 'schedule_appointments', 'handle_inquiries', 'take_messages']),
    category: 'ai_config',
    display_order: 50,
  },

  {
    field_key: 'daily_call_volume',
    field_name: 'Estimated Daily Call Volume',
    field_description: 'Approximate number of inbound calls or inquiries per day',
    field_type: 'number',
    required: false,
    extraction_hint:
      'Look for "we receive about X calls per day", "around Y inquiries daily", "peak volume of Z". ' +
      'Convert to a number. If given as a range (e.g., "50–80 calls"), use the midpoint (65). ' +
      'If no volume is mentioned, leave null.',
    example_value: '40',
    category: 'ai_config',
    display_order: 51,
  },

  {
    field_key: 'max_hold_time_seconds',
    field_name: 'Maximum Hold / Wait Time (seconds)',
    field_description: 'Longest time a caller should wait before the agent takes action',
    field_type: 'number',
    required: false,
    extraction_hint:
      'Look for "don\'t keep callers on hold more than X minutes", "max wait is Y seconds". ' +
      'Convert minutes to seconds (e.g., 3 minutes = 180). If not specified, default to 300 (5 minutes).',
    example_value: '180',
    category: 'ai_config',
    display_order: 52,
  },

  {
    field_key: 'custom_knowledge_base',
    field_name: 'Custom Knowledge Base Content',
    field_description: 'Business-specific knowledge the agent must have (policies, procedures, product details)',
    field_type: 'json',
    required: false,
    extraction_hint:
      'Extract any proprietary information not covered by other fields: cancellation policy, refund policy, ' +
      'special instructions for staff, product specs, internal procedures. ' +
      'Return as an array of { topic: string, content: string } objects.',
    example_value: JSON.stringify([
      { topic: 'cancellation_policy', content: 'Appointments must be cancelled at least 24 hours in advance to avoid a $50 fee.' },
      { topic: 'new_patient_forms', content: 'New patients must arrive 15 minutes early to complete intake paperwork.' },
    ]),
    category: 'ai_config',
    display_order: 53,
  },

  {
    field_key: 'crm_integration',
    field_name: 'CRM / Software Integration',
    field_description: 'Business software the agent should integrate with (CRM, EHR, scheduling tools)',
    field_type: 'json',
    required: false,
    extraction_hint:
      'Look for software names: Salesforce, HubSpot, Zoho, Dentrix, Kareo, OpenDental, Calendly, Acuity, etc. ' +
      'Return as an array of { name: string, purpose: string } objects where purpose describes how the agent should interact with it.',
    example_value: JSON.stringify([
      { name: 'Dentrix', purpose: 'Look up patient records and schedule appointments' },
      { name: 'Google Calendar', purpose: 'Check and book available appointment slots' },
    ]),
    category: 'ai_config',
    display_order: 54,
  },

  // ============================================================
  // CATEGORY: compliance  (Legal & regulatory)
  // ============================================================
  {
    field_key: 'compliance_requirements',
    field_name: 'Compliance & Regulatory Requirements',
    field_description: 'Industry regulations the agent must respect (e.g., HIPAA, GDPR, TCPA)',
    field_type: 'array',
    required: false,
    extraction_hint:
      'Look for mentions of "HIPAA compliant", "GDPR", "TCPA", "PCI-DSS", "must not record without consent", ' +
      '"do not share patient information", "licensed in state X". Infer from industry: healthcare → HIPAA, finance → PCI-DSS, EU clients → GDPR.',
    example_value: JSON.stringify(['HIPAA', 'TCPA']),
    category: 'compliance',
    display_order: 60,
  },

  {
    field_key: 'data_retention_policy',
    field_name: 'Data Retention Policy',
    field_description: 'How long should call logs, transcripts, and messages be stored?',
    field_type: 'string',
    required: false,
    extraction_hint:
      'Look for "retain records for X years", "delete after Y days", "do not store call recordings", ' +
      '"keep transcripts for 30 days". If not specified, return null.',
    example_value: 'Retain call logs for 90 days. Do not store recordings containing patient health information.',
    category: 'compliance',
    display_order: 61,
  },

  {
    field_key: 'consent_disclosure',
    field_name: 'Call Recording / Consent Disclosure',
    field_description: 'Required disclosure text when recording calls or collecting data',
    field_type: 'string',
    required: false,
    extraction_hint:
      'Look for "this call may be recorded", "by continuing you consent to", legal disclaimers about recording. ' +
      'Extract the exact disclosure text if provided, or note that one is required based on the compliance field.',
    example_value: 'This call may be recorded for quality assurance and training purposes.',
    category: 'compliance',
    display_order: 62,
  },
];


export async function seedOnboardingFieldSchemas() {

  for (const item of seedData) {

    await pool.query(
      `
      INSERT INTO onboarding_field_schemas (
        field_key,
        field_name,
        field_description,
        field_type,
        required,
        extraction_hint,
        example_value,
        category,
        display_order
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9
      )
      ON CONFLICT (field_key)
      DO NOTHING;
      `,
      [
        item.field_key,
        item.field_name,
        item.field_description,
        item.field_type,
        item.required,
        item.extraction_hint,
        item.example_value,
        item.category,
        item.display_order
      ]
    );
  }

  console.log(
    'Onboarding field schemas seeded successfully'
  );
}