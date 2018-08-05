require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const graphqlHTTP = require('express-graphql')
const uri = require('./utils/mongoUrl')
const bodyParser = require('body-parser')
const app = express()
const schema = require('./schema')
const adminRoutes = require('./api/routes/admin') // admin end-points
const loginRoutes = require('./api/routes/authenticated')
const checkAuth = require('./utils/check-auth')
mongoose.connect(uri,{
    useNewUrlParser: true,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    dbName: process.env.DB_NAME
})
app.use('/login', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/public', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/private', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use('/admin', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/auth', loginRoutes)

app.use('/admin',checkAuth,adminRoutes)

app.use('/graphql',graphqlHTTP({ // graphql query
    schema,
    graphiql: true
}))

app.use((req, res) => {
    res.status(404).send('<center><h1>404 Server not found</h1></center>')
})

module.exports = app;