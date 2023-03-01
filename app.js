const express = require("express")
const app = express()
const path = require("path")

app.use(express.json({extended : true}))
app.use("/server", require("./routes/zapros.js"))

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname,'client', 'build')));

app.use('/', express.static(path.join(__dirname, 'client', 'build')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})
const PORT = 3000

async function start() {
    app.listen(PORT, () => {
        console.log("hello world")
    })
} 
start()