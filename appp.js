const express = require("express")
const res = require("express/lib/response")
const app = express()
const path = require("path")

app.use(express.json({extended : true}))
app.use("/server", require("./routes/zapros.js"))

const PORT = 5000

async function start() {
    app.listen(PORT, () => {
        console.log("hello world")
    })
} 
start()