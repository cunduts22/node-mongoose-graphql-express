require('dotenv').config()
const http = require('http')
const app = require('./src/app')
const server = http.createServer(app)

server.listen(process.env.PORT).on('listening', () => {
    console.log(`Listening on port ${process.env.PORT}`)
})