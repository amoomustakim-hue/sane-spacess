import { findLanguage, type VoiceProvider } from '@/lib/languages'
import { ELEVENLABS_VOICES, YARNGPT_VOICES } from './catalog'

const PROVIDER_VOICE_IDS: Record<Exclude<VoiceProvider, 'browser'>, Set<string>> = {
  yarngpt: new Set(YARNGPT_VOICES.map((voice) => voice.id)),
  elevenlabs: new Set(ELEVENLABS_VOICES.map((voice) => voice.id)),
}

export function resolveVoiceRoute(languageCode?: string | null) {
  const language = findLanguage(languageCode)
  return { language, provider: language.provider }
}

export function isVoiceAllowed(provider: Exclude<VoiceProvider, 'browser'>, voiceId: string) {
  return PROVIDER_VOICE_IDS[provider].has(voiceId)
}

export function providerLabel(provider: VoiceProvider) {
  if (provider === 'yarngpt') return 'YarnGPT'
  if (provider === 'elevenlabs') return 'ElevenLabs'
  return 'Device voice'
}
