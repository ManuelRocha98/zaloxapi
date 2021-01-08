const mysql = require('mysql')
const con = mysql.createConnection({
    host: "cps17.webserver.pt",
    user: "grupo5_esmapp",
    password: "ZLE3frK9ZL5fXS8L",
    database: "grupo5_esmapp",
})

con.connect(err => {
    if (err) {
        console.log(err)
    } else {
        console.log("connected")
    }
})

module.exports = con