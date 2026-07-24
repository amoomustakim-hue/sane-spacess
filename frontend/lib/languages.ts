export type VoiceProvider = 'browser' | 'yarngpt' | 'elevenlabs'

export type SupportedLanguage = {
  code: string
  locale: string
  name: string
  nativeName: string
  emoji: string
  description: string
  provider: Exclude<VoiceProvider, 'browser'>
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: 'en-NG', locale: 'en-NG', name: 'Nigerian English', nativeName: 'Nigerian English', emoji: '🇳🇬', description: 'Natural Nigerian English', provider: 'yarngpt' },
  { code: 'pcm-NG', locale: 'en-NG', name: 'Nigerian Pidgin', nativeName: 'Naija Pidgin', emoji: '🇳🇬', description: 'Pidgin with authentic Naija delivery', provider: 'yarngpt' },
  { code: 'yo-NG', locale: 'yo-NG', name: 'Yoruba', nativeName: 'Yorùbá', emoji: '🇳🇬', description: 'Speak naturally in Yorùbá', provider: 'yarngpt' },
  { code: 'ig-NG', locale: 'ig-NG', name: 'Igbo', nativeName: 'Igbo', emoji: '🇳🇬', description: 'Speak naturally in Igbo', provider: 'yarngpt' },
  { code: 'ha-NG', locale: 'ha-NG', name: 'Hausa', nativeName: 'Hausa', emoji: '🇳🇬', description: 'Speak naturally in Hausa', provider: 'yarngpt' },
  { code: 'en', locale: 'en-US', name: 'English', nativeName: 'English', emoji: '🌍', description: 'International English', provider: 'elevenlabs' },
  { code: 'fr', locale: 'fr-FR', name: 'French', nativeName: 'Français', emoji: '🇫🇷', description: 'Parlez naturellement en français', provider: 'elevenlabs' },
  { code: 'es', locale: 'es-ES', name: 'Spanish', nativeName: 'Español', emoji: '🇪🇸', description: 'Habla naturalmente en español', provider: 'elevenlabs' },
  { code: 'pt', locale: 'pt-BR', name: 'Portuguese', nativeName: 'Português', emoji: '🇧🇷', description: 'Converse naturalmente em português', provider: 'elevenlabs' },
  { code: 'de', locale: 'de-DE', name: 'German', nativeName: 'Deutsch', emoji: '🇩🇪', description: 'Natürlich auf Deutsch sprechen', provider: 'elevenlabs' },
  { code: 'it', locale: 'it-IT', name: 'Italian', nativeName: 'Italiano', emoji: '🇮🇹', description: 'Parla naturalmente in italiano', provider: 'elevenlabs' },
  { code: 'ar', locale: 'ar-SA', name: 'Arabic', nativeName: 'العربية', emoji: '🇸🇦', description: 'تحدث بالعربية بشكل طبيعي', provider: 'elevenlabs' },
  { code: 'hi', locale: 'hi-IN', name: 'Hindi', nativeName: 'हिन्दी', emoji: '🇮🇳', description: 'हिन्दी में सहज बातचीत', provider: 'elevenlabs' },
  { code: 'zh', locale: 'zh-CN', name: 'Mandarin Chinese', nativeName: '中文', emoji: '🇨🇳', description: '用中文自然交流', provider: 'elevenlabs' },
  { code: 'ja', locale: 'ja-JP', name: 'Japanese', nativeName: '日本語', emoji: '🇯🇵', description: '日本語で自然に話す', provider: 'elevenlabs' },
  { code: 'ko', locale: 'ko-KR', name: 'Korean', nativeName: '한국어', emoji: '🇰🇷', description: '한국어로 자연스럽게 대화하세요', provider: 'elevenlabs' },
]

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES.find((language) => language.code === 'en')!

export function findLanguage(value?: string | null) {
  if (!value) return DEFAULT_LANGUAGE
  return SUPPORTED_LANGUAGES.find((language) => language.code === value || language.name === value || language.nativeName === value) ?? DEFAULT_LANGUAGE
}
