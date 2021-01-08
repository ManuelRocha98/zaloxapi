const con = require("../connection")
const messages = require("../messages")

async function getMessageResources(req, res) {
    const query = "select resource_id, message_id from message_resources;"
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("getMessageResources", results))
    })
}

async function addMessageResource(req, res) {
    const { resource_id, message_id} = req.body
    const query = `insert into message_resources (resource_id, message_id) values ("${resource_id}", "${message_id}")`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("addMessageResource", results))
    })
}

async function deleteMessageResource(req, res) {
    const { id } = req.params
    const query = `delete from message_resources where resource_id = ${id}`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("deleteMessageResource", results))
    })
}

async function editMessageResources(req, res) {
    const { id } = req.params
    const { resource_id, message_id} = req.body
    let set = []
    if (resource_id) {
        set.push(`resource_id = "${resource_id}"`) 
    }
    if (message_id) {
        set.push(`message_id = "${message_id}"`) 
    }
    
    const query = `update message_resources set ${set.join()} where resource_id = ${id}`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("editMessageResources", results))
    })
}


module.exports = { getMessageResources, addMessageResource, deleteMessageResource, editMessageResources}