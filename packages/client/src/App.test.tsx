import App from './App'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

const appContent = 'HOME'

// global.fetch = jest.fn(() =>
//   Promise.resolve({ json: () => Promise.resolve('hey') })
// )

test('Example test', async () => {
  await act(() => {
    render(<App />)
  })
  expect(screen.getByText(appContent)).toBeDefined()
})
