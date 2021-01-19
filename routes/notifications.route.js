const express = require("express")
const router = express.Router()
const controller = require("../controllers/notifications.controller")
const auth = require("../middleware/auth.middleware")

router.get("/", auth, controller.getNotification)
router.post("/", auth, controller.addNotification)
router.delete("/:id", auth, controller.deleteNotification)

module.exports = app => app.use("/notifications", router)