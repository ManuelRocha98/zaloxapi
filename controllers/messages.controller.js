const con = require("../connection")
const messages = require("../messages")

async function getMessages(req, res) {
    const query = "select id_message, content, user_id, task_id, timestamps from messages;"
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("getMessages", results))
    })
}

async function addMessage(req, res) {
    const { content, user_id, task_id, timestamps} = req.body
    const query = `insert into messages (content, user_id, task_id, timestamps) values ("${content}", "${user_id}", "${task_id}", "${timestamps}")`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("addMessage", results))
    })
}

async function deleteMessage(req, res) {
    const { id } = req.params
    const query = `delete from messages where id_message = ${id}`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("deleteMessage", results))
    })
}

async function editMessage(req, res) {
    const { id } = req.params
    const {content, user_id, task_id, timestamps} = req.body
    let set = []
    if (content) {
        set.push(`content = "${content}"`) 
    }
    if (user_id) {
        set.push(`user_id = "${user_id}"`) 
    }
    if (task_id) {
        set.push(`task_id = "${task_id}"`) 
    }
    if (timestamps) {
        set.push(`timestamps = "${timestamps}"`) 
    }
    
    const query = `update messages set ${set.join()} where id_message = ${id}`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("editMessage", results))
    })
}


module.exports = { getMessages, addMessage, deleteMessage, editMessage}