#!/usr/bin/env node

import * as express from 'express'
import { resolve } from 'path'
import { argv } from 'yargs'

const p = argv.p as number
const port = argv.port as number || p || process.env.PORT
if (!port) {
  console.error('`--port` not be specified')
  process.exit(1)
}

if (argv._.length === 0) {
  console.error('directory not be specified')
  process.exit(1)
}

const dir = argv._[0]
const cwd = process.cwd()

const app = express()
app.use(express.static(resolve(cwd, dir)))

app.get('*', (_, res) => {
  res.sendFile(resolve(cwd, 'index.html'))
})

app.listen(port)
console.log(`Easy SPA server started -\ndir: ${dir}\nurl: http://localhost:${port}`)
