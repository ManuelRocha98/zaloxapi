const express = require("express")
const router = express.Router()
const controller = require("../controllers/users.controller")
const auth = require("../middleware/auth.middleware")

router.get("/", auth,controller.getUsers)
router.post("/", auth, controller.addUser)
router.delete("/:id", auth, controller.deleteUser)
router.put("/:id", auth, controller.editUser)

module.exports = app => app.use("/users", router)