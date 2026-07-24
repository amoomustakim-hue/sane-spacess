'use client'

import { SUPPORTED_REGIONS } from '@/lib/regions'

export default function RegionSelector({ value, onChange }: { value: string; onChange: (code: string) => void }) {
  return (
    <div>
      <label htmlFor="region" className="text-sm font-medium text-dark">Country or region</label>
      <p className="mt-0.5 text-xs text-gray-text">Used only to show relevant emergency and crisis resources.</p>
      <select
        id="region"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-dark outline-none focus:ring-2 focus:ring-primary"
      >
        {SUPPORTED_REGIONS.map((region) => <option key={region.code} value={region.code}>{region.name}</option>)}
      </select>
    </div>
  )
}
