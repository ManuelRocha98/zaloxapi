const express = require("express")
const router = express.Router()
const controller = require("../controllers/tasks.controller")
const auth = require("../middleware/auth.middleware")

router.get("/", auth, controller.getTasks)
router.post("/", auth, controller.addTask)
router.delete("/:id", auth, controller.deleteTask)
router.put("/:id", auth, controller.editTask)

module.exports = app => app.use("/tasks", router)