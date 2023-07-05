import { render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { MainButton } from '@ui/main-button/main-button'

const appContent = '/'

// global.fetch = jest.fn(() =>
//   Promise.resolve({ json: () => Promise.resolve('hey') })
// )

test('Example test', async () => {
  await act(() => {
    render(<MainButton />)
  })

  expect(window.location.pathname).toEqual(appContent)
})
