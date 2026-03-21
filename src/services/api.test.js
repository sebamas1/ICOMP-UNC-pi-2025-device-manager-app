import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  getDevices,
  getDeviceSensors,
  getSensorHistory,
  getSensorCurrent,
  getDeviceStatus,
  healthcheck
} from './api.js'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('api helpers', () => {
  it('getDevices calls /api/devices', async () => {
    fetch.mockResolvedValueOnce({ ok: true, status: 200, json: async () => ([{ id: 1 }]) })
    const out = await getDevices()
    expect(out).toEqual([{ id: 1 }])
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/devices'), expect.any(Object))
  })

  it('getDeviceSensors calls /api/devices/:id/sensors', async () => {
    fetch.mockResolvedValueOnce({ ok: true, status: 200, json: async () => ([{ id: 1 }]) })
    const out = await getDeviceSensors(10)
    expect(out).toEqual([{ id: 1 }])
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/devices/10/sensors'), expect.any(Object))
  })

  it('getSensorHistory prefers deviceId+sensorId branch', async () => {
    fetch.mockResolvedValueOnce({ ok: true, status: 200, json: async () => ([]) })
    await getSensorHistory({ deviceId: 1, sensorId: 2, sensorType: 'Temperature', limit: 5 })
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/devices/1/sensors/2/history?limit=5'), expect.any(Object))
  })

  it('getSensorHistory falls back to type branch', async () => {
    fetch.mockResolvedValueOnce({ ok: true, status: 200, json: async () => ([]) })
    await getSensorHistory({ deviceId: null, sensorId: null, sensorType: 'Temperature', limit: 7 })
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/sensors/Temperature/history?limit=7'), expect.any(Object))
  })

  it('getSensorCurrent prefers deviceId+sensorId branch', async () => {
    fetch.mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ value: 1 }) })
    await getSensorCurrent({ deviceId: 1, sensorId: 2, sensorType: 'Temperature' })
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/devices/1/sensors/2/current'), expect.any(Object))
  })

  it('getDeviceStatus calls /api/devices/:id/status', async () => {
    fetch.mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ online: true }) })
    const out = await getDeviceStatus(3)
    expect(out).toEqual({ online: true })
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/devices/3/status'), expect.any(Object))
  })

  it('healthcheck falls back to /api/health when /api/devices/health fails', async () => {
    fetch
      .mockResolvedValueOnce({ ok: false, status: 500, json: async () => ({}) }) // /api/devices/health -> throws
      .mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ ok: true }) }) // /api/health

    const out = await healthcheck()
    expect(out).toEqual({ ok: true })
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/devices/health'), expect.any(Object))
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/health'), expect.any(Object))
  })
})

