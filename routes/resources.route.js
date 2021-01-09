const express = require("express")
const router = express.Router()
const controller = require("../controllers/resources.controller")
const auth = require("../middleware/auth.middleware")

router.get("/", auth, controller.getResources)
router.post("/", auth, controller.addResource)
router.delete("/:id", auth, controller.deleteResource)
router.put("/:id", auth, controller.editResource)

module.exports = app => app.use("/resources", router)