const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(__dirname + "/../reception.db")
module.exports = async (req, res, next) => {
  const splitted = req.path.split('/')
  const requested = splitted[1]
  req.body.id = requested
  const params = {}
  let columns = ""
  Object.keys(req.body).forEach(k => {
    params[`$${k}`] = req.body[k]
    if(k === "id"){
      return
    }
    columns += ("," + k + "=$" + k)
  })
  db.get(`update users set accepted=true ${columns} where id=$id`, params, (err) => {
    if(err){
      res.send({isError: true})
    }else {
      res.send({isError: false})
    }
  })
}

