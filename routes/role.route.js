const express = require("express")
const router = express.Router()
const controller = require("../controllers/roles.controller")
const auth = require("../middleware/auth.middleware")

router.get("/", auth, controller.getRoles)
router.post("/", auth, controller.addRole)
router.delete("/:id", auth, controller.deleteRole)
router.put("/:id", auth, controller.editRole)

module.exports = app => app.use("/roles", router)