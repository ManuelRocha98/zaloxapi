const con = require("../connection")
const messages = require("../messages")
const moment = require("moment")

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
    const { content, user_id, task_id } = req.body
    const query = `insert into messages (content, user_id, task_id, timestamps) values ("${content}", "${user_id}", "${task_id}", "${moment().format(' YYYY-MM-DD, HH:mm:ss')}")`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("addMessage", results))
    })
}

function respond(data) {
    const messageContent = data.content
    const roomName = data.task_id
    const user = data.user_id
    console.log(`[Room Number ${roomName}] ${user} : ${messageContent}`)
    let message = {
        "message": messageContent,
        "userName": user,
        "roomName": roomName,
    }
    return message
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
    const { content, user_id, task_id, timestamps } = req.body
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


module.exports = { getMessages, addMessage, deleteMessage, editMessage, respond }
