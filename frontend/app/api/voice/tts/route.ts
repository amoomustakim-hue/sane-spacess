import { NextRequest, NextResponse } from 'next/server'
import { findLanguage } from '@/lib/languages'
import { ELEVENLABS_VOICES, YARNGPT_VOICES } from '@/lib/voice/catalog'

const ELEVENLABS_IDS = new Set(ELEVENLABS_VOICES.map((voice) => voice.id))
const YARNGPT_IDS = new Set(YARNGPT_VOICES.map((voice) => voice.id))

async function yarnGptTts(text: string, voiceId: string) {
  const apiKey = process.env.YARNGPT_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'YarnGPT is not configured' }, { status: 503 })
  const response = await fetch(process.env.YARNGPT_API_URL || 'https://yarngpt.ai/api/v1/tts', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
    body: JSON.stringify({ text, voice: voiceId, response_format: 'mp3' }),
    signal: AbortSignal.timeout(30000),
  })
  if (!response.ok) return NextResponse.json({ error: 'YarnGPT request failed' }, { status: response.status })
  return new NextResponse(await response.arrayBuffer(), {
    headers: { 'Content-Type': response.headers.get('content-type') || 'audio/mpeg', 'Cache-Control': 'no-store', 'X-Voice-Provider': 'yarngpt' },
  })
}

async function elevenLabsTts(text: string, voiceId: string) {
  const apiKey = process.env.ELEVENLABS_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'ElevenLabs is not configured' }, { status: 503 })
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
    body: JSON.stringify({ text, model_id: 'eleven_multilingual_v2', voice_settings: { stability: 0.5, similarity_boost: 0.75 } }),
    signal: AbortSignal.timeout(30000),
  })
  if (!response.ok) return NextResponse.json({ error: 'ElevenLabs request failed' }, { status: response.status })
  return new NextResponse(await response.arrayBuffer(), {
    headers: { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'no-store', 'X-Voice-Provider': 'elevenlabs' },
  })
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null) as { text?: string; voiceId?: string; languageCode?: string } | null
  const text = body?.text?.trim().slice(0, 600)
  const voiceId = body?.voiceId
  const language = findLanguage(body?.languageCode)
  if (!text || !voiceId) return NextResponse.json({ error: 'text and voiceId are required' }, { status: 400 })
  try {
    if (language.provider === 'yarngpt') {
      if (!YARNGPT_IDS.has(voiceId)) return NextResponse.json({ error: 'Voice is not available for this language' }, { status: 400 })
      return await yarnGptTts(text, voiceId)
    }
    if (!ELEVENLABS_IDS.has(voiceId)) return NextResponse.json({ error: 'Voice is not available for this language' }, { status: 400 })
    return await elevenLabsTts(text, voiceId)
  } catch (error) {
    const message = error instanceof Error && error.name === 'TimeoutError' ? 'TTS request timed out' : 'TTS provider request failed'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
