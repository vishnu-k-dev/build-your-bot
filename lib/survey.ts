export interface SurveyQuestion {
  id: string
  question: string
  hint: string
  type: 'text' | 'select' | 'multiselect' | 'textarea'
  options?: string[]
}

export const SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    id: 'business_type',
    question: 'What does your business sell or offer?',
    hint: 'e.g. handmade jewelry, software tools, clothing, consulting services',
    type: 'textarea',
  },
  {
    id: 'tone',
    question: 'How should your bot talk to customers?',
    hint: 'Pick the vibe that matches your brand',
    type: 'select',
    options: ['Friendly & casual', 'Professional & formal', 'Fun & playful', 'Warm & empathetic'],
  },
  {
    id: 'common_questions',
    question: 'What are the top questions customers usually ask you?',
    hint: 'e.g. shipping times, return policy, product sizes, pricing',
    type: 'textarea',
  },
  {
    id: 'fallback',
    question: 'When the bot doesn\'t know something, what should it do?',
    hint: 'Choose how to handle unanswered questions',
    type: 'select',
    options: [
      'Say "I\'m not sure, please contact us"',
      'Give your email/phone for follow-up',
      'Ask the customer to rephrase',
      'Apologize and offer to escalate',
    ],
  },
  {
    id: 'contact_info',
    question: 'What\'s your support contact info? (optional)',
    hint: 'Email, phone, or WhatsApp — shown when bot can\'t help',
    type: 'text',
  },
  {
    id: 'business_hours',
    question: 'What are your business hours?',
    hint: 'e.g. Mon–Fri 9am–6pm IST, or "We\'re available 24/7"',
    type: 'text',
  },
  {
    id: 'return_policy',
    question: 'Do you have a return or refund policy?',
    hint: 'Summarize it briefly so the bot can explain it to customers',
    type: 'textarea',
  },
  {
    id: 'avoid_topics',
    question: 'Are there any topics the bot should never discuss?',
    hint: 'e.g. competitor comparisons, pricing negotiations, internal processes',
    type: 'textarea',
  },
  {
    id: 'collect_info',
    question: 'Should the bot try to collect customer name or email?',
    hint: 'Useful for follow-ups or lead generation',
    type: 'select',
    options: ['Yes, ask for name and email', 'Only ask for email', 'No, keep it anonymous'],
  },
  {
    id: 'extra',
    question: 'Anything else your bot should know about your business?',
    hint: 'Special offers, brand values, things that make you unique',
    type: 'textarea',
  },
]

export function buildSystemPrompt(
  businessName: string,
  botName: string,
  survey: Record<string, string>
): string {
  const tone = survey.tone || 'Friendly & casual'
  const fallback = survey.fallback || 'Say "I\'m not sure, please contact us"'
  const contact = survey.contact_info ? `Contact: ${survey.contact_info}` : ''
  const hours = survey.business_hours ? `Business hours: ${survey.business_hours}` : ''
  const avoid = survey.avoid_topics ? `Never discuss: ${survey.avoid_topics}` : ''
  const collect = survey.collect_info || 'No'
  const returnPolicy = survey.return_policy ? `Return policy: ${survey.return_policy}` : ''
  const extra = survey.extra || ''

  return `You are ${botName}, the AI customer support assistant for ${businessName}.

TONE: ${tone}. Keep answers short, clear, and on-brand.

INSTRUCTIONS:
- Answer ONLY using the provided context below.
- If the answer is not in the context, ${fallback}.
${contact ? `- When you can't help, share this: ${contact}` : ''}
${hours ? `- ${hours}` : ''}
${returnPolicy ? `- ${returnPolicy}` : ''}
${avoid ? `- ${avoid}` : ''}
${collect.startsWith('Yes') ? '- Politely ask for the customer\'s name and email before ending the conversation.' : ''}
${collect === 'Only ask for email' ? '- Politely ask for the customer\'s email before ending the conversation.' : ''}
${extra ? `\nADDITIONAL CONTEXT:\n${extra}` : ''}

CONTEXT FROM KNOWLEDGE BASE:
{context}`.trim()
}
