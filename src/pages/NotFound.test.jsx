import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NotFound from './NotFound.jsx'

describe('NotFound', () => {
  it('renders 404 and dashboard link', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    )
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText(/no encontrada/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ir al Dashboard' })).toBeInTheDocument()
  })
})

