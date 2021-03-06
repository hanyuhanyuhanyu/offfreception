const express = require('express')
const bodyParser = require("body-parser")
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const fs = require("fs")

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    fs.copyFileSync(__dirname + "/../reception.db_bc", __dirname + "/../reception.db")
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
