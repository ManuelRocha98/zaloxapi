const con = require("../connection")
const messages = require("../messages")

async function getRoles(req, res) {
    const query = "select id_role, name from roles;"
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("getRoles", results))
    })
}

async function addRole(req, res) {
    const { name } = req.body
    const query = `insert into roles (name) values ("${name}")`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("addRoles", results))
    })
}

async function deleteRole(req, res) {
    const { id } = req.params
    const query = `delete from roles where id_role = ${id}`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("deleteRole", results))
    })
}

async function editRole(req, res) {
    const { id } = req.params
    const { name } = req.body
    let set = []
    if (name) {
        set.push(`name = "${name}"`)
    }
    const query = `update roles set ${set.join()} where id_role = ${id}`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("editRole", results))
    })
}


module.exports = { getRoles, addRole, deleteRole, editRole }