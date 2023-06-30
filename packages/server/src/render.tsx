import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { AppDemo } from 'client/src/app-demo'

export async function render() {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <AppDemo />
    </React.StrictMode>
  )
  return { html }
}
