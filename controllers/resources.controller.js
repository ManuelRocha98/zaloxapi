const con = require("../connection")
const messages = require("../messages")

async function getResources(req, res) {
    const query = "select id_resource, path, alias, timestamps from resources;"
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("getResources", results))
    })
}

async function addResource(req, res) {
    const { title, description, state, timestamps, manager_id} = req.body
    const query = `insert into resources (path, alias, timestamps) values ("${path}", "${alias}", "${timestamps}")`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("addResource", results))
    })
}

async function deleteResource(req, res) {
    const { id } = req.params
    const query = `delete from resources where id_resource = ${id}`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("deleteResource", results))
    })
}

async function editResource(req, res) {
    const { id } = req.params
    const {path, alias, timestamps} = req.body
    let set = []
    if (path) {
        set.push(`path = "${path}"`) 
    }
    if (alias) {
        set.push(`alias = "${alias}"`) 
    }
    if (timestamps) {
        set.push(`timestamps = "${timestamps}"`) 
    }
    
    const query = `update resources set ${set.join()} where id_resource = ${id}`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("editResource", results))
    })
}


module.exports = { getResources, addResource, deleteResource, editResource}