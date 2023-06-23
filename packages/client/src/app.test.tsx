import App from './app'
import { render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

const appContent = '/'

// global.fetch = jest.fn(() =>
//   Promise.resolve({ json: () => Promise.resolve('hey') })
// )

test('Example test', async () => {
  await act(() => {
    render(<App />)
  })

  expect(window.location.pathname).toEqual(appContent)
})
