const express = require("express")
const router = express.Router()
const controller = require("../controllers/projectUsers.controller")
const auth = require("../middleware/auth.middleware")

router.get("/", auth, controller.getProjectsUsers)
router.post("/", auth, controller.addProjectUser)
router.delete("/:id", auth, controller.deleteProjectUser)
router.put("/:id", auth, controller.editProjectUser)

module.exports = app => app.use("/projectUsers", router)