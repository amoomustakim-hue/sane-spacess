import type { SupportResource } from './supportResources'

export type SupportedRegion = {
  code: string
  name: string
  emergencyNumber: string
  resources: SupportResource[]
}

export const SUPPORTED_REGIONS: SupportedRegion[] = [
  {
    code: 'NG', name: 'Nigeria', emergencyNumber: '112',
    resources: [
      { name: 'Mentally Aware Nigeria Initiative (MANI)', contact: '08091726902', description: 'Mental health support resource in Nigeria' },
      { name: 'Emergency services', contact: '112', description: 'Call if you or someone else is in immediate danger' },
    ],
  },
  {
    code: 'US', name: 'United States', emergencyNumber: '911',
    resources: [
      { name: '988 Suicide & Crisis Lifeline', contact: 'Call or text 988', description: 'Free, confidential crisis support available 24/7' },
      { name: 'Emergency services', contact: '911', description: 'Call if there is immediate danger' },
    ],
  },
  {
    code: 'CA', name: 'Canada', emergencyNumber: '911',
    resources: [
      { name: '9-8-8 Suicide Crisis Helpline', contact: 'Call or text 9-8-8', description: 'Trained crisis responders available 24/7' },
      { name: 'Emergency services', contact: '911', description: 'Call if there is immediate danger' },
    ],
  },
  {
    code: 'GB', name: 'United Kingdom', emergencyNumber: '999',
    resources: [
      { name: 'Samaritans', contact: '116 123', description: 'Free emotional support by phone' },
      { name: 'Emergency services', contact: '999', description: 'Call if there is immediate danger' },
    ],
  },
  {
    code: 'IE', name: 'Ireland', emergencyNumber: '112 or 999',
    resources: [
      { name: 'Samaritans', contact: '116 123', description: 'Free emotional support by phone' },
      { name: 'Emergency services', contact: '112 or 999', description: 'Call if there is immediate danger' },
    ],
  },
  {
    code: 'AU', name: 'Australia', emergencyNumber: '000',
    resources: [
      { name: 'Lifeline Australia', contact: '13 11 14', description: 'Free, confidential crisis support available 24/7' },
      { name: 'Emergency services', contact: '000', description: 'Call if there is immediate danger' },
    ],
  },
  {
    code: 'OTHER', name: 'Other country or region', emergencyNumber: 'Your local emergency number',
    resources: [
      { name: 'Local emergency services', contact: 'Your local emergency number', description: 'Call immediately if you or someone else is in danger' },
      { name: 'Find a local crisis line', contact: 'findahelpline.com', description: 'Search for verified support services in your country' },
    ],
  },
]

export function findRegion(code?: string | null) {
  return SUPPORTED_REGIONS.find((region) => region.code === code) ?? SUPPORTED_REGIONS.at(-1)!
}
