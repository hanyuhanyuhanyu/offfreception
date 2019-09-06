const sqlite3 = require('sqlite3').verbose()
const log4js = require('log4js')
log4js.configure({
  appenders: {
    system: {type: 'file', filename: 'http_req.log'}
  },
  categories: {
    default: {appenders: ['system'], level: 'info'}
  }
})
const logger = log4js.getLogger('system')
const db = new sqlite3.Database(__dirname + "/../reception.db")
module.exports = async (req, res, next) => {
  const splitted = req.path.split('/')
  const requested = splitted[1]
  req.body.id = requested
  const params = {}
  let columns = ""
  console.log(req.body)
  Object.keys(req.body).forEach(k => {
    params[`$${k}`] = req.body[k]
    if(k === "id"){
      return
    }
    columns += ("," + k + "=$" + k)
  })
  logger.info(`ip: ${req.ip} | id: ${requested}`)
  console.log(`update users set accepted=true ${columns} where id=$id`)
  db.get(`select * from users where id=$id`, params, (err, res) => {
    if(err){
      return
    } else {
      logger.info(`ip: ${req.ip}; data: ${JSON.stringify(res)}`)
    }
  })
  db.get(`update users set accepted=true ${columns} where id=$id`, params, (err) => {
    if(err){
      res.send({isError: true})
    }else {
      res.send({isError: false})
    }
  })
}

