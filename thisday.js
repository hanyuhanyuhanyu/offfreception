const fs = require('fs')
const jimp = require('jimp')
const mim = require('merge-img')
const sqlite3 = require('sqlite3').verbose()
const qr = require('qrcode')
const text2png = require('text2png')
const db = new sqlite3.Database(__dirname + "/reception.db_bc")
const qrs = fs.readFileSync('./thisdayqrs.txt').toString().split("\n").forEach((line, i) => {
  const name = `./thisdays/thisdayqr${i}.png`
  qr.toFile(name, line, {width: 128}, (e) => {

  })
})
