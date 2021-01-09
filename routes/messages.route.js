const express = require("express")
const router = express.Router()
const controller = require("../controllers/messages.controller")
const auth = require("../middleware/auth.middleware")

router.get("/", auth, controller.getMessages)
router.post("/", auth, controller.addMessage)
router.delete("/:id", auth, controller.deleteMessage)
router.put("/:id", auth, controller.editMessage)

module.exports = app => app.use("/messages", router)