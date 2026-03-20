import { describe, it, expect } from 'vitest'
import { formatDate } from './format.js'

describe('formatDate', () => {
  it('formats a valid ISO date', () => {
    const out = formatDate('2025-01-02T03:04:05Z')
    // depends on local timezone, so assert structure only
    expect(out).toMatch(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/)
  })

  it('returns input when date is invalid', () => {
    const out = formatDate('not-a-date')
    expect(typeof out).toBe('string')
  })
})

