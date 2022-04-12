const bodyParser = require("body-parser")
const express = require("express")
const morgan = require("morgan")

const app = express()
const server = require("http").createServer(app)

morgan.token(`colorstatus`, (req, res) => {
    const status = (typeof res.headersSent !== `boolean` ? Boolean(res._header) : res.headersSent) ? res.statusCode : "-"
    const color = status >= 500 ? 31 // red
        : status >= 400 ? 33 // yellow
            : status >= 300 ? 36 // cyan
                : status >= 200 ? 32 // green
                    : 0 // no color
    return `\x1b[${color}m${status}\x1b[0m`
})

app.use(morgan(":date[iso] :method :url :colorstatus :response-time ms - :res[content-length]", {
    skip: function (req, res) {
        return res.statusCode < 400 && req.originalUrl.includes("/assets/")
    }
}))

app.use(bodyParser.json())

app.use("/dist", express.static(__dirname + "/dist"))
app.use("/assets", express.static(__dirname + "/assets"))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/dist/index.html")
})

// THESE MUST BE LAST MIDDLEWARES
app.use(function (req, res) {
    res.status(404).send({ error: "NOT_FOUND" })
})

app.use(function (err, req, res, next) {
    console.log(err)
    res.status(500).send({ error: "INTERNAL_SERVER_ERROR" })
})

server.listen(3000, function () {
    console.log(`Server started on ${server.address().port}`);
});