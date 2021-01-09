const express = require("express")
const router = express.Router()
const controller = require("../controllers/messageResources.controller")

router.get("/", controller.getMessageResources)
router.post("/", controller.addMessageResource)
router.delete("/:id", controller.deleteMessageResource)
router.put("/:id", controller.editMessageResources)

module.exports = app => app.use("/messageResources", router)