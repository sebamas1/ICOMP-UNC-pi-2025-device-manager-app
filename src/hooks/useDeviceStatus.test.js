import { describe, it, expect, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useDeviceStatus } from './useDeviceStatus.js'

vi.mock('../services/api.js', () => ({
  getDeviceStatus: vi.fn(async () => ({ online: true })),
  healthcheck: vi.fn(async () => ({ ok: true }))
}))

describe('useDeviceStatus', () => {
  it('loads status on mount', async () => {
    const { result } = renderHook(() => useDeviceStatus(1))
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.status).toEqual({ online: true })
  })

  it('healthcheck updates status', async () => {
    const { result } = renderHook(() => useDeviceStatus(1))
    await waitFor(() => expect(result.current.loading).toBe(false))
    await result.current.healthcheck()
    expect(result.current.status).toEqual({ online: true })
  })
})

