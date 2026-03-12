import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Stub global fetch para que los tests no llamen al backend real
global.fetch = vi.fn(async () => ({
  ok: true,
  json: async () => ([]),
}))
