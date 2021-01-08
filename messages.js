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
    }
}