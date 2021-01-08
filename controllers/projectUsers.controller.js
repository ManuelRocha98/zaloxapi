const con = require("../connection")
const messages = require("../messages")

async function getProjectsUsers(req, res) {
    const query = "select project_id, users_id from project_users;"
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("getProjectsUsers", results))
    })
}

async function addProjectUser(req, res) {
    const { project_id, users_id } = req.body
    const query = `insert into projects_users (project_id, users_id) values ("${project_id}", "${users_id}")`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("addProjectUser", results))
    })
}

async function deleteProjectUser(req, res) {
    const { id } = req.params
    const query = `delete from projects_users where project_id = ${id}`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("deleteProjectUser", results))
    })
}

async function editProjectUser(req, res) {
    const { id } = req.params
    const { project_id, users_id } = req.body
    let set = []
    if (project_id) {
        set.push(`project_id = "${project_id}"`)
    }
    if (users_id) {
        set.push(`users_id = "${users_id}"`)
    }

    const query = `update project_users set ${set.join()} where project_id = ${id}`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("editProjectUser", results))
    })
}


module.exports = { getProjectsUsers, addProjectUser, deleteProjectUser, editProjectUser }