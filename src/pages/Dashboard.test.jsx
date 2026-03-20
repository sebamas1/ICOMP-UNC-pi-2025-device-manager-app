import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import Dashboard from './Dashboard.jsx'

vi.mock('../services/api.js', () => ({
  getDevices: vi.fn(async () => ([
    { id: 1, name: 'D1', status: 'online' }
  ])),
  getDeviceSensors: vi.fn(async () => ([
    { id: 10, name: 'Temp', type: 'Temperature', value: 20, status: 'Active' },
    { id: 11, name: 'Hum', type: 'Humidity', value: 50, status: 'Active' }
  ]))
}))

vi.mock('../hooks/useDeviceStatus.js', () => ({
  useDeviceStatus: () => ({ status: { online: true }, loading: false, healthcheck: vi.fn() })
}))

vi.mock('../hooks/useSensorData.js', () => ({
  useSensorData: () => ({
    readings: [{ timestamp: 'x', value: 42, source: 'sensor' }],
    loading: false,
    fetchCurrent: vi.fn(),
    fetchHistory: vi.fn()
  })
}))

describe('Dashboard', () => {
  it('loads devices and sensors and renders panels', async () => {
    render(<Dashboard />)

    // header exists immediately
    expect(screen.getAllByText('Dispositivo').length).toBeGreaterThan(0)

    // wait for sensors to appear
    await waitFor(() => expect(screen.getByText('Temp')).toBeInTheDocument())
    expect(screen.getByText('Hum')).toBeInTheDocument()
  })
})

