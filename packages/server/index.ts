import fs from 'node:fs/promises'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const PORT = process.env.PORT || 3001

const clientDir = path.join(__dirname, '..', '..', 'client', 'dist')

const templateDemo = await fs.readFile(`${clientDir}/index-ssr.html`, 'utf-8')
const templateMain = await fs.readFile(`${clientDir}/index.html`, 'utf-8')

const app = express()

app.use('/assets', express.static(path.join(clientDir, 'assets')))
app.get('/', async (_, res) => {
  try {
    // @ts-ignore
    const render = (await import('./render.js')).render
    const rendered = await render()
    const html = templateDemo.replace(`<!--app-html-->`, rendered.html ?? '')

    res.send(html)
  } catch (e: unknown) {
    res.status(500).end((e as Error).stack)
  }
})

app.get('*', (_, res) => {
  res.send(templateMain)
})

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})
