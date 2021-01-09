const express = require("express")
const router = express.Router()
const controller = require("../controllers/projectUsers.controller")

router.get("/", controller.getProjectsUsers)
router.post("/", controller.addProjectUser)
router.delete("/:id", controller.deleteProjectUser)
router.put("/:id", controller.editProjectUser)

module.exports = app => app.use("/projectsUsers", router)