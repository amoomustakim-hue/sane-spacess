import type { VoiceProvider } from '@/lib/languages'

export type VoiceOption = { id: string; label: string; sub: string; provider: VoiceProvider }
export const BROWSER_VOICE: VoiceOption = { id: 'browser', label: 'Device voice', sub: 'Free fallback', provider: 'browser' }
export const YARNGPT_VOICES: VoiceOption[] = [
  { id: 'Idera', label: 'Idera', sub: 'Melodic & gentle', provider: 'yarngpt' },
  { id: 'Zainab', label: 'Zainab', sub: 'Soothing & gentle', provider: 'yarngpt' },
  { id: 'Osagie', label: 'Osagie', sub: 'Smooth & calm', provider: 'yarngpt' },
  { id: 'Jude', label: 'Jude', sub: 'Warm & confident', provider: 'yarngpt' },
  { id: 'Chinenye', label: 'Chinenye', sub: 'Engaging & warm', provider: 'yarngpt' },
]
export const ELEVENLABS_VOICES: VoiceOption[] = [
  { id: 'JBFqnCBsd6RMkjVDRZzb', label: 'George', sub: 'Warm & grounded', provider: 'elevenlabs' },
  { id: 'cjVigY5qzO86Huf0OWal', label: 'Eric', sub: 'Calm & reassuring', provider: 'elevenlabs' },
  { id: 'FGY2WhTYpPnrIDTdsKH5', label: 'Laura', sub: 'Clear & supportive', provider: 'elevenlabs' },
]
export function voicesForProvider(provider: 'yarngpt' | 'elevenlabs') {
  return [BROWSER_VOICE, ...(provider === 'yarngpt' ? YARNGPT_VOICES : ELEVENLABS_VOICES)]
}
