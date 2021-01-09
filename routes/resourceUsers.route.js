const express = require("express")
const router = express.Router()
const controller = require("../controllers/resourceUsers.controller")

router.get("/", controller.getResourceUsers)
router.post("/", controller.addResourceUser)
router.delete("/:id", controller.deleteResourceUser)
router.put("/:id", controller.editResourceUser)


module.exports = app => app.use("/resourceUsers", router)