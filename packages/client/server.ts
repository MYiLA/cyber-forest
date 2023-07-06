import * as fs from 'node:fs/promises'
import express from 'express'
import { createServer as createSsrServer } from 'vite'
import * as path from 'path'

const isProduction = process.env.NODE_ENV === 'production'
const PORT = process.env.CLIENT_PORT || 3000

const getStyleSheets = async () => {
  try {
    const assetsPath = './dist/client/assets'
    const files = await fs.readdir(assetsPath)
    const cssAssets = files.filter(l => l.endsWith('.css'))
    const allContent = []
    for (const asset of cssAssets) {
      const content = await fs.readFile(path.join(assetsPath, asset), 'utf-8')
      allContent.push(content)
    }
    return `<style type="text/css">${allContent.join('')}</style>`
  } catch {
    return ''
  }
}

async function createServer() {
  const templateHtml = isProduction
    ? await fs.readFile('./dist/client/index.html', 'utf-8')
    : ''

  const ssrManifest = isProduction
    ? await fs.readFile('./dist/client/ssr-manifest.json', 'utf-8')
    : undefined

  const app = express()

  const vite = await createSsrServer({
    server: { middlewareMode: true },
    appType: 'custom',
  })

  isProduction
    ? app.use('/', express.static('./dist/client', { index: false }))
    : app.use(vite.middlewares)

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl
      let template
      let render
      if (!isProduction) {
        template = await fs.readFile('./index.html', 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
      } else {
        template = templateHtml
        render = (await vite.ssrLoadModule('./dist/server/entry-server.js'))
          .render
      }

      const rendered = await render(url, ssrManifest)

      const stylesSheets = isProduction ? await getStyleSheets() : ''
      const html = template
        .replace(`<!--app-head-->`, stylesSheets ?? '')
        .replace(`<!--app-html-->`, rendered.html ?? '')
        .replace(`<!--app-state-->`, rendered.state ?? '')

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e: any) {
      vite?.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
  })
}

createServer()
