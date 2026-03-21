import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import DeviceStatusCard from './DeviceStatusCard.jsx'

vi.mock('../utils/format.js', () => ({
  formatDate: () => '01/01/2025 00:00:00'
}))

describe('DeviceStatusCard', () => {
  it('renders online status and calls healthcheck', () => {
    const onHealthcheck = vi.fn()
    render(
      <DeviceStatusCard
        status={{ online: true, ip: '1.2.3.4', uptime: '1h', lastSeen: 'x' }}
        onHealthcheck={onHealthcheck}
        loading={false}
      />
    )

    expect(screen.getByText('Estado del microcontrolador')).toBeInTheDocument()
    expect(screen.getByText('Online')).toBeInTheDocument()
    expect(screen.getByText('1.2.3.4')).toBeInTheDocument()
    expect(screen.getByText('1h')).toBeInTheDocument()
    expect(screen.getByText('01/01/2025 00:00:00')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /healthcheck/i }))
    expect(onHealthcheck).toHaveBeenCalledTimes(1)
  })

  it('renders offline placeholders', () => {
    render(<DeviceStatusCard status={{ online: false }} onHealthcheck={() => {}} loading={true} />)
    expect(screen.getByText('Offline')).toBeInTheDocument()
    expect(screen.getAllByText('-').length).toBeGreaterThan(0)
  })
})

