const jwt = require("jsonwebtoken")
const config = require("../config")
const messages = require("../messages")
const con = require("../connection")

module.exports = (req, res, next) => {
    // gets request "authorization" header
    const authHeader = req.headers.authorization

    // if "authorization" does not exist
    if (!authHeader) {
        return res.status(messages.token.missing.status).send(messages.token.missing)
    }

    // splits "authorization" header
    const parts = authHeader.split(" ")


    // a token has this layout: "Bearer + token"
    if (parts.length !== 2) {
        return res.status(messages.token.malformated.status).send(messages.token.malformated)
    }

    const [bearer, token] = parts

    if (bearer !== "Bearer") {
        return res.status(messages.token.malformated.status).send(messages.token.malformated) 
    }


    // verifies token integrity
    jwt.verify(token, config.secret, async (err, decoded) => {
        if (err) {
            return res.status(messages.token.invalid.status).send(messages.token.invalid)
        }

        const query = `select * from user where id_user = "${decoded.id}"`
        con.query(query, (err, results, fields) => {
            if (err) {
                console.log(err)
                return res.status(messages.token.malformated.status).send(messages.token.malformated)
            }
            if (!results.length) {
                return res.status(messages.error().status).send(messages.error("error", "User not Found"))
            }
            const user = results[0];
            req.loggedUser = user
            return next()
        })

    })

}