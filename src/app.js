require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const graphqlHTTP = require('express-graphql')
const uri = require('./utils/mongoUrl')
const bodyParser = require('body-parser')
const app = express()
const schema = require('./schema')
const adminRoutes = require('./api/routes/admin') // admin end-points

mongoose.connect(uri,{
    useNewUrlParser: true,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    dbName: process.env.DB_NAME
})

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use((req, res, next) => {
    console.log(req.ip)
    next()
})

app.use(adminRoutes)

app.use('/graphql',graphqlHTTP({ // graphql query
    schema,
    graphiql: true
}))

app.use((req, res) => {
    res.status(404).send('<center><h1>404 Server not found</h1></center>')
})

module.exports = app;