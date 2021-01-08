const con = require("../connection")
const messages = require("../messages")

async function getUsers(req, res) {
    const query = "select * from users;"
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("getUsers", results))
    })
}

async function addUser(req, res) {
    const { username, password, roleId} = req.body
    const query = `insert into users (username, password, role_id) values ("${username}", "${password}", "${roleId}")`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("addUsers", results))
    })
}

async function deleteUser(req, res) {
    const { id } = req.params
    const query = `delete from users where id_user = ${id}`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("deleteUser", results))
    })
}

async function editUser(req, res) {
    const { id } = req.params
    const { username, password, roleId} = req.body
    let set = []
    if (username) {
        set.push(`username = "${username}"`) 
    }
    if (password) {
        set.push(`password = "${password}"`) 
    }
    if (roleId) {
        set.push(`password = "${roleId}"`) 
    }
    
    const query = `update users set ${set.join()} where id_user = ${id}`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        res.send(messages.getSuccess("editUser", results))
    })
}


module.exports = { getUsers, addUser, deleteUser, editUser}