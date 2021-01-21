const con = require("../connection")
const messages = require("../messages")
const moment = require("moment")
let last_task_id = ""

async function getTasks(req, res) {
    const query = "SELECT tasks.*, users.username from task_users inner join tasks on tasks.id_task = task_users.task_id inner join users on users.id_user = task_users.user_id;"
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("getTasks", results))
    })
}

async function addTask(req, res) {
    const { title, description, state, project_id, manager_id } = req.body
    const query = `insert into tasks (title, description, state, end_date, timestamps, project_id, manager_id) values ("${title}", "${description}", "${state}", "${moment().format('YYYY-MM-DD')}", "${moment().format(' YYYY-MM-DD, HH:mm:ss')}", "${project_id}", "${manager_id}")`
    console.log(query)
    con.query(query, (err1, results1, fields) => {
        if (err1) {
            return res.status(messages.error().status).send(messages.error("error", err1.sqlMessage))
        }
        last_task_id = results1.insertId;
        //task_id = ID da task que acabou de ser criado
        const query3 = `insert into task_users (task_id, user_id) values ("${last_task_id}", "${manager_id}")`
        con.query(query3, (err2, results2, fields) => {
            if (err2) {
                return res.status(messages.error().status).send(messages.error("error", err2.sqlMessage))
            }
            res.send(messages.getSuccess("addTask", results1))
        })
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
    const { id_task, title, description, state, end_date, timestamps, project_id } = req.body
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
    if (project_id) {
        set.push(`project_id = "${project_id}"`)
    }

    const query = `update tasks set ${set.join()} where id_task = ${id}`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("editTask", results))
    })
}


module.exports = { getTasks, addTask, deleteTask, editTask }
