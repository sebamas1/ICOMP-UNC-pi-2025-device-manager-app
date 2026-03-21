import { describe, it, expect } from 'vitest'
import theme from './theme.js'

describe('theme', () => {
  it('exports a MUI theme with expected palette', () => {
    expect(theme).toBeTruthy()
    expect(theme.palette.mode).toBe('light')
    expect(theme.palette.primary.main).toBe('#2e7d32')
    expect(theme.shape.borderRadius).toBe(12)
  })
})

