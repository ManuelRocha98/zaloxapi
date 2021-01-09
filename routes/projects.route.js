const express = require("express")
const router = express.Router()
const controller = require("../controllers/projects.controller")
const auth = require("../middleware/auth.middleware")

router.get("/", auth, controller.getProjects)
router.post("/", auth, controller.addProject)
router.delete("/:id", auth, controller.deleteProject)
router.put("/:id", auth, controller.editProject)

module.exports = app => app.use("/projects", router)