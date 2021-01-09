const con = require("../connection")
const messages = require("../messages")

async function getTaskUsers(req, res) {
    const query = "select task_id, user_id from task_users;"
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("getTaskUsers", results))
    })
}

async function addTaskUser(req, res) {
    const { task_id, user_id} = req.body
    const query = `insert into task_users (task_id, user_id) values ("${task_id}", "${user_id}")`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("addTaskUser", results))
    })
}

async function deleteTaskUser(req, res) {
    const { id } = req.params
    const query = `delete from task_users where task_id = ${id}`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("deleteTaskUser", results))
    })
}

async function editTaskUser(req, res) {
    const { id } = req.params
    const {task_id, users_id} = req.body
    let set = []
    if (task_id) {
        set.push(`task_id = "${task_id}"`) 
    }
    if (users_id) {
        set.push(`users_id = "${users_id}"`) 
    }
    
    const query = `update task_users set ${set.join()} where task_id = ${id}`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("editTaskUser", results))
    })
}


module.exports = { getTaskUsers, addTaskUser, deleteTaskUser, editTaskUser}