const con = require("../connection")
const messages = require("../messages")
const moment = require("moment")
let last_project_id = ""

async function getProjects(req, res) {
    const query = "select id_project, title, description, timestamps, manager_id from projects;"
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("getProjects", results))
    })
}

async function addProject(req, res) {
    const { title, description, manager_id } = req.body
    const query = `insert into projects (title, description, timestamps, manager_id) values ("${title}", "${description}", "${moment().format(' YYYY-MM-DD, HH:mm:ss')}", "${manager_id}")`
    con.query(query, (err1, results1, fields) => {
        if (err1) {
            return res.status(messages.error().status).send(messages.error("error", err1.sqlMessage))
        }
        last_project_id = results1.insertId;
        //project_id = ID do projeto que acabou de ser criado
        const query3 = `insert into project_users (project_id, user_id) values ("${last_project_id}", "${manager_id}")`
        con.query(query3, (err2, results2, fields) => {
            if (err2) {
                return res.status(messages.error().status).send(messages.error("error", err2.sqlMessage))
            }
            res.send(messages.getSuccess("addProject", results1))
        })
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
    const { title, description, state, timestamps, manager_id } = req.body
    let set = []
    if (title) {
        set.push(`title = "${title}"`)
    }
    if (description) {
        set.push(`description = "${description}"`)
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


module.exports = { getProjects, addProject, deleteProject, editProject }