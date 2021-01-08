const express = require("express")
const router = express.Router()
const controller = require("../controllers/resources.controller")

router.get("/", controller.getResources)
router.post("/", controller.addResource)
router.delete("/:id", controller.deleteResource)
router.put("/:id", controller.editResource)

module.exports = app => app.use("/resources", router)