const con = require("../connection")
const messages = require("../messages")

async function getProjects(req, res) {
    const query = "select id_project, title, description, state, timestamps, manager_id from projects;"
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("getProjects", results))
    })
}

async function addProject(req, res) {
    const { title, description, state, timestamps, manager_id} = req.body
    const query = `insert into projects (title, description, state, timestamps, manager_id) values ("${title}", "${description}", "${state}", "${timestamps}", "${manager_id}",)`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("addProject", results))
    })
}

async function deleteProject(req, res) {
    const { id } = req.params
    const query = `delete from projects where id_project = ${id}`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("deleteProject", results))
    })
}

async function editProject(req, res) {
    const { id } = req.params
    const {title, description, state, timestamps, manager_id} = req.body
    let set = []
    if (title) {
        set.push(`title = "${title}"`) 
    }
    if (description) {
        set.push(`description = "${description}"`) 
    }
    if (state) {
        set.push(`state = "${state}"`) 
    }
    if (timestamps) {
        set.push(`timestamps = "${timestamps}"`) 
    }
    if (manager_id) {
        set.push(`manager_id = "${manager_id}"`) 
    }
    
    const query = `update projects set ${set.join()} where id_project = ${id}`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("editProject", results))
    })
}


module.exports = { getProjects, addProject, deleteProject, editProject}