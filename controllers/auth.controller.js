const con = require("../connection")
const jwt = require("jsonwebtoken")
const config = require("../config")
const messages = require("../messages")
const bcrypt = require("bcryptjs")

function generateToken(userId) {
    return jwt.sign({
        id: userId,
    }, config.secret, {
        expiresIn: 3600 * 24 * 7
    })
}

async function signIn(req, res) {
    const { name, password } = req.body

    if (!name || !password) {
        return res.status(400).send({ error: "Missing arguments." })
    }

    const query = `select * from user where name = "${name}"`
    con.query(query, (err, results, fields) => {
        if (err) {
            return res.status(messages.error().status).send(messages.error("error", err.sqlMessage))
        }
        if (!results.length) {
            return res.status(messages.error().status).send(messages.error("error", "User not Found"))
        }
        const user = results[0];
        const compare = async (pass) => {
            if (!await bcrypt.compare(pass, user.password)) {
                return res.status(messages.error().status).send(messages.error("error", "Invalid Password"))
            }
        }
        compare(password);
        user.id = user.id_user;
        delete user.id_user;
        delete user.password;
        res.send(messages.getSuccess("signIn", {
            jwt: generateToken(user.id),
            user
        }))
    })
}


module.exports = { signIn }