const express = require("express")
const router = express.Router()
const controller = require("../controllers/projects.controller")

router.get("/", controller.getProjects)
router.post("/", controller.addProject)
router.delete("/:id", controller.deleteProject)
router.put("/:id", controller.editProject)

module.exports = app => app.use("/projects", router)