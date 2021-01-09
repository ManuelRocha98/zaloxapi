const con = require("../connection")
const messages = require("../messages")

async function getResourceUsers(req, res) {
    const query = "select resource_id, user_id from resource_users;"
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("getResourceUsers", results))
    })
}

async function addResourceUser(req, res) {
    const { resource_id, user_id } = req.body
    const query = `insert into resource_users (resource_id, user_id) values ("${resource_id}", "${user_id}")`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("addResourceUser", results))
    })
}

async function deleteResourceUser(req, res) {
    const { id } = req.params
    const query = `delete from resource_users where resource_id = ${id}`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("deleteResourceUser", results))
    })
}

async function editResourceUser(req, res) {
    const { id } = req.params
    const { resource_id, users_id } = req.body
    let set = []
    if (resource_id) {
        set.push(`resource_id = "${resource_id}"`)
    }
    if (users_id) {
        set.push(`users_id = "${users_id}"`)
    }

    const query = `update resource_users set ${set.join()} where resource_id = ${id}`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("editResourceUser", results))
    })
}


module.exports = { getResourceUsers, addResourceUser, deleteResourceUser, editResourceUser }