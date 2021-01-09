const con = require("../connection")
const messages = require("../messages")

async function getTasks(req, res) {
    const query = "select * from tasks;"
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("getTasks", results))
    })
}

async function addTask(req, res) {
    const { title, description, state, end_date, timestamps, type, project_id } = req.body
    const query = `insert into tasks (title, description, state, end_date, timestamps, type, project_id) values ("${title}", "${description}", "${state}", "${end_date}", "${timestamps}", "${type}", "${project_id}")`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("addTask", results))
    })
}

async function deleteTask(req, res) {
    const { id } = req.params
    const query = `delete from tasks where id_task = ${id}`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("deleteTask", results))
    })
}

async function editTask(req, res) {
    const { id } = req.params
    const { id_task, title, description, state, end_date, timestamps, type, project_id } = req.body
    let set = []
    if (id_task) {
        set.push(`id_task = "${id_task}"`)
    }
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
    if (end_date) {
        set.push(`end_date = "${end_date}"`)
    }
    if (type) {
        set.push(`type = "${type}"`)
    }
    if (project_id) {
        set.push(`project_id = "${project_id}"`)
    }

    const query = `update tasks set ${set.join()} where id_tasks = ${id}`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("editTask", results))
    })
}


module.exports = { getTasks, addTask, deleteTask, editTask }