import express from 'express'
import { json, urlencoded } from 'body-parser'
import * as path from 'path'
import * as http from 'http'
import * as https from 'https'
import dotenv from 'dotenv'
import cors from 'cors'
import fs from 'fs'
import db from './config/db'
import cookieParser from 'cookie-parser'
import { apiRouter } from './api-router'
import helmet from 'helmet'

const isProduction = process.env.NODE_ENV === 'production'
if (!isProduction) {
  dotenv.config({ path: '../../.env' })
}

const app = express()
app.use(helmet.xssFilter())
app.use(
  cors({
    credentials: true,
    origin: [
      '*',
      'null',
      'http://localhost:3000',
      'http://localhost:3001',
      'https://localhost:3000',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      'https://127.0.0.1:3000',
      'https://cyberforest.ru',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
)

app.use(json())
app.use(
  urlencoded({
    extended: true,
  })
)
app.use(cookieParser())
app.use('/api', apiRouter)

db.sync({ alter: true })
  .then(() => {
    console.log('DB connected')
  })
  .catch(() => {
    console.log('DB error')
  })

const PORT = Number(process.env.SERVER_PORT || 3001)
const HOST = isProduction ? 'cyberforest.ru' : 'localhost'

const server = isProduction
  ? https.createServer(
      {
        key: fs.readFileSync(
          path.join(
            __dirname,
            '..',
            '..',
            '..',
            'ssl/certbot/conf/live/cyberforest.ru/privkey.pem'
          )
        ),
        cert: fs.readFileSync(
          path.join(
            __dirname,
            '..',
            '..',
            '..',
            'ssl/certbot/conf/live/cyberforest.ru/cert.pem'
          )
        ),
      },
      app
    )
  : http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server started at: ${HOST}:${PORT}`)
})
