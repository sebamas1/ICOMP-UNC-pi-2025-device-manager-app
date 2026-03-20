import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SensorPanel from './SensorPanel.jsx'

vi.mock('../utils/format.js', () => ({
  formatDate: () => '01/01/2025 00:00:00'
}))

describe('SensorPanel', () => {
  it('shows empty state', () => {
    render(
      <SensorPanel
        title="Temp"
        unit="°C"
        sensorType="Temperature"
        readings={[]}
        onFetchCurrent={() => {}}
        onRefreshHistory={() => {}}
        loading={false}
      />
    )
    expect(screen.getByText('Sin datos aún.')).toBeInTheDocument()
  })

  it('renders readings and triggers actions', () => {
    const onFetchCurrent = vi.fn()
    const onRefreshHistory = vi.fn()

    render(
      <SensorPanel
        title="Temp"
        unit="°C"
        sensorType="Temperature"
        readings={[{ timestamp: 'x', value: 42, source: 'sensor' }]}
        onFetchCurrent={onFetchCurrent}
        onRefreshHistory={onRefreshHistory}
        loading={false}
      />
    )

    expect(screen.getByText('01/01/2025 00:00:00')).toBeInTheDocument()
    expect(screen.getByText('42 °C')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Historial' }))
    fireEvent.click(screen.getByRole('button', { name: 'Leer ahora' }))
    expect(onRefreshHistory).toHaveBeenCalledTimes(1)
    expect(onFetchCurrent).toHaveBeenCalledTimes(1)
  })
})

