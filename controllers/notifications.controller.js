const con = require("../connection")
const messages = require("../messages")

async function getNotification(req, res) {
    const query = "select id_notification, content from notifications;"
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("getNotification", results))
    })
}

async function addNotification(req, res) {
    const { content } = req.body
    const query = `insert into notifications (content) values ("${content}")`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("addNotification", results))
    })
}


module.exports = { getNotification, addNotification}