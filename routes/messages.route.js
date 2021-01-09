const express = require("express")
const router = express.Router()
const controller = require("../controllers/messages.controller")

router.get("/", controller.getMessages)
router.post("/", controller.addMessage)
router.delete("/:id", controller.deleteMessage)
router.put("/:id", controller.editMessage)

module.exports = app => app.use("/messages", router)