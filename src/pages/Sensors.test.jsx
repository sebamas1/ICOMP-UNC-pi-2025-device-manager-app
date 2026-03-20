import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Sensors from './Sensors.jsx'

describe('Sensors', () => {
  it('renders info message', () => {
    render(<Sensors />)
    expect(screen.getByText('Sensores')).toBeInTheDocument()
    expect(
      screen.getByText(/esta sección podrá incluir gráficos/i)
    ).toBeInTheDocument()
  })
})

