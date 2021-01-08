const express = require("express")
const router = express.Router()
const controller = require("../controllers/taskUsers.controller")

router.get("/", controller.getTaskUsers)
router.post("/", controller.addTaskUser)
router.delete("/:id", controller.deleteTaskUser)
router.put("/:id", controller.editTaskUser)

module.exports = app => app.use("/taskUsers", router)