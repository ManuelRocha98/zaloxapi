const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()

const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({ credentials: true, origin: true }))

require("./routes/index")(app)
app.listen(port, () => console.log("listening on Port " + port))