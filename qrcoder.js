const fs = require('fs')
const jimp = require('jimp')
const mim = require('merge-img')
const sqlite3 = require('sqlite3').verbose()
const qr = require('qrcode')
const text2png = require('text2png')
const db = new sqlite3.Database(__dirname + "/reception.db_bc")
db.all('select * from users', (err, rows)=> {
  rows.forEach((row, ind) => {
    const {handleName, id} = row
    const qrNameBuf = `./qrBuf${ind}.png`
    const nameBufName = `./nameBuf${ind}.png`
    qr.toFile(qrNameBuf, id, {width: 130}, (err) =>{
      fs.writeFileSync(nameBufName, text2png(handleName, {backgroundColor: "#fff"}))
      mim([qrNameBuf, nameBufName], {direction: true})
      .then(img => {
          img.write(`qrs/${("000"+ind).slice(-3)}${handleName}.png`, () => {
          fs.unlink(qrNameBuf, () => 0)
          fs.unlink(nameBufName, () => 0)
        })
      })
    })
  })
})
