'use client'

import { useMemo, useState } from 'react'
import { AlertCircle, CheckCircle2, Search, Volume2 } from 'lucide-react'
import { SUPPORTED_LANGUAGES, findLanguage } from '@/lib/languages'
import { COMMUNICATION_STYLES, type CommunicationStyle } from '@/lib/preferences'
import { voicesForProvider } from '@/lib/voice/catalog'
import { providerLabel } from '@/lib/voice/routing'

type Props = {
  languageCode: string
  communicationStyle: CommunicationStyle
  voiceId: string
  onLanguageChange: (languageCode: string) => void
  onStyleChange: (style: CommunicationStyle) => void
  onVoiceChange: (voiceId: string) => void
}

export default function LanguageVoicePicker(props: Props) {
  const [query, setQuery] = useState('')
  const [previewing, setPreviewing] = useState<string | null>(null)
  const [previewMessage, setPreviewMessage] = useState<{ tone: 'success' | 'error'; text: string } | null>(null)
  const language = findLanguage(props.languageCode)
  const voices = voicesForProvider(language.provider)
  const filteredLanguages = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return SUPPORTED_LANGUAGES
    return SUPPORTED_LANGUAGES.filter((item) =>
      `${item.name} ${item.nativeName}`.toLowerCase().includes(normalized),
    )
  }, [query])

  const previewVoice = async (voiceId: string) => {
    setPreviewing(voiceId)
    setPreviewMessage(null)
    const sample = language.code === 'pcm-NG'
      ? 'How you dey? I dey here with you.'
      : `Hello. This is SaneSpace speaking ${language.name}.`
    try {
      if (voiceId === 'browser') {
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(sample)
        utterance.lang = language.locale
        window.speechSynthesis.speak(utterance)
        await new Promise<void>((resolve) => {
          utterance.onend = () => resolve()
          utterance.onerror = () => resolve()
        })
      } else {
        const response = await fetch('/api/voice/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: sample, voiceId, languageCode: language.code }),
        })
        if (!response.ok) {
          const details = await response.json().catch(() => null) as { error?: string } | null
          throw new Error(details?.error ?? 'Preview unavailable')
        }
        const url = URL.createObjectURL(await response.blob())
        const audio = new Audio(url)
        await audio.play()
        await new Promise<void>((resolve) => {
          audio.onended = () => resolve()
          audio.onerror = () => resolve()
        })
        URL.revokeObjectURL(url)
      }
      setPreviewMessage({ tone: 'success', text: `${voiceId === 'browser' ? 'Device voice' : providerLabel(language.provider)} preview played.` })
    } catch (error) {
      const reason = error instanceof Error ? error.message : 'Preview unavailable'
      setPreviewMessage({ tone: 'error', text: `${reason}. Your device voice remains available.` })
    } finally {
      setPreviewing(null)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium text-dark" htmlFor="language-search">Language</label>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-text" size={16} />
          <input id="language-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search languages" className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-3 text-sm text-dark outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div className="mt-3 grid max-h-64 grid-cols-1 gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
          {filteredLanguages.map((item) => (
            <button
              type="button"
              key={item.code}
              onClick={() => { props.onLanguageChange(item.code); props.onVoiceChange('browser') }}
              className={`rounded-xl border p-3 text-left transition-colors ${item.code === language.code ? 'border-primary bg-primary-light' : 'border-border bg-surface hover:border-primary-mid'}`}
            >
              <span className="mr-2 text-lg">{item.emoji}</span>
              <span className="text-sm font-medium text-dark">{item.nativeName}</span>
              {item.nativeName !== item.name && <span className="ml-1 text-xs text-gray-text">({item.name})</span>}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-dark">Conversation style</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {COMMUNICATION_STYLES.map((style) => (
            <button type="button" key={style.id} onClick={() => props.onStyleChange(style.id)} className={`rounded-xl border p-3 text-left ${props.communicationStyle === style.id ? 'border-primary bg-primary-light' : 'border-border bg-surface'}`}>
              <span className="block text-sm font-medium text-dark">{style.label}</span>
              <span className="mt-0.5 block text-xs text-gray-text">{style.description}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-dark">Voice</p>
        <div className="mt-1 flex items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${language.provider === 'yarngpt' ? 'bg-emerald-100 text-emerald-800' : 'bg-violet-100 text-violet-800'}`}>{providerLabel(language.provider)}</span>
          <p className="text-xs text-gray-text">{language.provider === 'yarngpt' ? 'Authentic Nigerian voice routing' : 'Multilingual voice routing'}</p>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {voices.map((voice) => (
            <div key={voice.id} className={`flex items-center rounded-full border ${props.voiceId === voice.id ? 'border-primary bg-primary-light' : 'border-border bg-surface'}`}>
              <button type="button" onClick={() => props.onVoiceChange(voice.id)} className="px-3 py-2 text-left">
                <span className="block text-xs font-medium text-dark">{voice.label}</span>
                <span className="block text-[10px] text-gray-text">{voice.sub}</span>
              </button>
              <button type="button" aria-label={`Preview ${voice.label}`} onClick={() => previewVoice(voice.id)} disabled={previewing !== null} className="mr-2 rounded-full p-1.5 text-primary hover:bg-white disabled:opacity-40">
                <Volume2 size={14} className={previewing === voice.id ? 'animate-pulse' : ''} />
              </button>
            </div>
          ))}
        </div>
        {previewMessage && (
          <p role="status" className={`mt-3 flex items-center gap-1.5 text-xs ${previewMessage.tone === 'error' ? 'text-amber-700' : 'text-emerald-700'}`}>
            {previewMessage.tone === 'error' ? <AlertCircle size={14} /> : <CheckCircle2 size={14} />}
            {previewMessage.text}
          </p>
        )}
      </div>
    </div>
  )
}
