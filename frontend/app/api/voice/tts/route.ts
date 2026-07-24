import { NextRequest, NextResponse } from 'next/server'
import { isVoiceAllowed, resolveVoiceRoute } from '@/lib/voice/routing'

const jsonError = (error: string, status: number, provider?: string) =>
  NextResponse.json({ error, provider, fallback: 'browser' }, { status })

async function yarnGptTts(text: string, voiceId: string) {
  const apiKey = process.env.YARNGPT_API_KEY
  if (!apiKey) return jsonError('YarnGPT is not configured', 503, 'yarngpt')
  const response = await fetch(process.env.YARNGPT_API_URL || 'https://yarngpt.ai/api/v1/tts', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
    body: JSON.stringify({ text, voice: voiceId, response_format: 'mp3' }),
    signal: AbortSignal.timeout(30000),
  })
  if (!response.ok) return jsonError('YarnGPT could not generate this audio', response.status, 'yarngpt')
  return new NextResponse(await response.arrayBuffer(), {
    headers: { 'Content-Type': response.headers.get('content-type') || 'audio/mpeg', 'Cache-Control': 'no-store', 'X-Voice-Provider': 'yarngpt' },
  })
}

async function elevenLabsTts(text: string, voiceId: string) {
  const apiKey = process.env.ELEVENLABS_API_KEY
  if (!apiKey) return jsonError('ElevenLabs is not configured', 503, 'elevenlabs')
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
    body: JSON.stringify({ text, model_id: 'eleven_multilingual_v2', voice_settings: { stability: 0.5, similarity_boost: 0.75 } }),
    signal: AbortSignal.timeout(30000),
  })
  if (!response.ok) return jsonError('ElevenLabs could not generate this audio', response.status, 'elevenlabs')
  return new NextResponse(await response.arrayBuffer(), {
    headers: { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'no-store', 'X-Voice-Provider': 'elevenlabs' },
  })
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null) as { text?: string; voiceId?: string; languageCode?: string } | null
  const text = body?.text?.trim().slice(0, 600)
  const voiceId = body?.voiceId
  const { provider } = resolveVoiceRoute(body?.languageCode)
  if (!text || !voiceId) return jsonError('text and voiceId are required', 400)
  try {
    if (provider === 'yarngpt') {
      if (!isVoiceAllowed(provider, voiceId)) return jsonError('Voice is not available for this language', 400, provider)
      return await yarnGptTts(text, voiceId)
    }
    if (!isVoiceAllowed(provider, voiceId)) return jsonError('Voice is not available for this language', 400, provider)
    return await elevenLabsTts(text, voiceId)
  } catch (error) {
    const message = error instanceof Error && error.name === 'TimeoutError' ? 'TTS request timed out' : 'TTS provider request failed'
    return jsonError(message, 502, provider)
  }
}
