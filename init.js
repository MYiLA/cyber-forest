const fs = require('fs')

fs.copyFileSync('.env.sample', '.env')

fs.mkdirSync('tmp', { recursive: true })
fs.mkdirSync('./packages/server/uploads', { recursive: true })
