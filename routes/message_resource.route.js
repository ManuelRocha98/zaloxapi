const express = require("express")
const router = express.Router()
const controller = require("../controllers/messageResources.controller")
const auth = require("../middleware/auth.middleware")

router.get("/", auth, controller.getMessageResources)
router.post("/", auth, controller.addMessageResource)
router.delete("/:id", auth, controller.deleteMessageResource)
router.put("/:id", auth, controller.editMessageResources)

module.exports = app => app.use("/messageResources", router)