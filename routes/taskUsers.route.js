const express = require("express")
const router = express.Router()
const controller = require("../controllers/taskUsers.controller")
const auth = require("../middleware/auth.middleware")

router.get("/", auth,  controller.getTaskUsers)
router.post("/", auth, controller.addTaskUser)
router.delete("/:id", auth, controller.deleteTaskUser)
router.put("/:id", auth, controller.editTaskUser)

module.exports = app => app.use("/taskUsers", router)