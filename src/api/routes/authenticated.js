const express = require('express')()
const app = express
const query = require('../../utils/methodExpress')

app.route('/login')
    .post(query('login', 'admin'))

module.exports = app