const express = require("express")
const router = express.Router()
const controller = require("../controllers/users.controller")

router.get("/", controller.getUsers)
router.post("/", controller.addUser)
router.delete("/:id", controller.deleteUser)
router.put("/:id", controller.editUser)

module.exports = app => app.use("/users", router)