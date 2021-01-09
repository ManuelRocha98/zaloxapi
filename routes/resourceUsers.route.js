const express = require("express")
const router = express.Router()
const controller = require("../controllers/resourceUsers.controller")
const auth = require("../middleware/auth.middleware")

router.get("/", auth, controller.getResourceUsers)
router.post("/", auth, controller.addResourceUser)
router.delete("/:id", auth, controller.deleteResourceUser)
router.put("/:id", auth, controller.editResourceUser)


module.exports = app => app.use("/resourceUsers", router)