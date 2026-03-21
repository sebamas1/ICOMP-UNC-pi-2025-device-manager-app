import { describe, it, expect, vi } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { useSensorData } from './useSensorData.js'

vi.mock('../services/api.js', () => ({
  getSensorHistory: vi.fn(async () => ([{ timestamp: 't', value: 1, source: 'sensor' }])),
  getSensorCurrent: vi.fn(async () => ({ timestamp: 't2', value: 2, source: 'sensor' }))
}))

describe('useSensorData', () => {
  it('loads history on mount', async () => {
    const { result } = renderHook(() =>
      useSensorData({ deviceId: 1, sensorId: 2, sensorType: 'Temperature' })
    )
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.readings.length).toBe(1)
  })

  it('fetchCurrent prepends current value', async () => {
    const { result } = renderHook(() =>
      useSensorData({ deviceId: 1, sensorId: 2, sensorType: 'Temperature' })
    )
    await waitFor(() => expect(result.current.loading).toBe(false))
    await act(async () => {
      await result.current.fetchCurrent()
    })
    expect(result.current.readings[0].value).toBe(2)
  })
})

