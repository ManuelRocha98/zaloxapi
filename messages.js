module.exports = {
    error(name, message) {
        return {
            name,
            message,
            status: 400,
            sucess: false
        }
    },
    getSuccess(name, content) {
        return {
            name,
            content,
            status: 200,
            sucess: true
        }
    },
    token: {
        missing: {
            name: "missingToken",
            message: {
                pt: "Token necessário."
            },
            status: 401,
            success: false
        },
        malformated: {
            name: "malformatedToken",
            message: {
                pt: "Token desformatado."
            },
            status: 401,
            success: false
        },
        invalid: {
            name: "invalidToken",
            message: {
                pt: "Token inválido."
            },
            status: 401,
            success: false
        }
    }
}