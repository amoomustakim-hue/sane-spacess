export const COMMUNICATION_STYLES = [
  { id: 'natural', label: 'Natural', description: 'Warm and culturally natural' },
  { id: 'casual', label: 'Casual', description: 'Relaxed and conversational' },
  { id: 'formal', label: 'Formal', description: 'Structured and professional' },
  { id: 'simple', label: 'Simple', description: 'Clear language and short sentences' },
] as const

export type CommunicationStyle = typeof COMMUNICATION_STYLES[number]['id']
