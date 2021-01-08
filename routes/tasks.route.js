const express = require("express")
const router = express.Router()
const controller = require("../controllers/tasks.controller")

router.get("/", controller.getTasks)
router.post("/", controller.addTask)
router.delete("/:id", controller.deleteTask)
router.put("/:id", controller.editTask)

module.exports = app => app.use("/tasks", router)