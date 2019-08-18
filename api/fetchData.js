const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(__dirname + "/../reception.db")
module.exports = async (req, res, next) => {
  const splitted = req.path.split('/')
  const requested = splitted[1]
  db.get("select * from users where id=?", requested, (err, result) => {
    if(err){
      res.send("error")
    }
    res.send(result)
  })
}
