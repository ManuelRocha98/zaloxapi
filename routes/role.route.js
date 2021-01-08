const express = require("express")
const router = express.Router()
const controller = require("../controllers/roles.controller")

router.get("/", controller.getRoles)
router.post("/", controller.addRole)
router.delete("/:id", controller.deleteRole)
router.put("/:id", controller.editRole)

module.exports = app => app.use("/roles", router)