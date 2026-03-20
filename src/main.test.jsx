import { describe, it, expect, vi, beforeEach } from 'vitest'

const renderMock = vi.fn()
const createRootMock = vi.fn(() => ({ render: renderMock }))

vi.mock('react-dom/client', () => ({
  default: { createRoot: createRootMock },
  createRoot: createRootMock
}))

describe('main entrypoint', () => {
  beforeEach(() => {
    renderMock.mockClear()
    createRootMock.mockClear()
    document.body.innerHTML = '<div id="root"></div>'
  })

  it('creates root and renders app tree', async () => {
    // dynamic import so the module runs after mocks are set
    await import('./main.jsx')
    expect(createRootMock).toHaveBeenCalled()
    expect(renderMock).toHaveBeenCalled()
  })
})

