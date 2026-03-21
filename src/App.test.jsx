import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter initialEntries={['/sensors']}>
        <App />
      </MemoryRouter>
    )
    expect(document.body).toBeTruthy()
    expect(screen.getAllByText('Sensores').length).toBeGreaterThan(0)
  })
})
