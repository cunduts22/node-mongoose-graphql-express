const express = require('express')()
const app = express
const query = require('../../utils/methodExpress')

app.route('/user')
    .get(query('get', 'user'))
    .post(query('post', 'user'));

app.route('/user/:_id')
    .get(query('getOne', 'user'))
    .delete(query('delete', 'user'))
    .post(query('updatearray','user'))
    .put(query('deletearray','user'))
    .patch(query('patch', 'user'))


app.route('/book')
    .get(query('get','book'))
    .post(query('post','book'))

app.route('/book/:_id')
    .get(query('getOne','book'))
    .delete(query('delete','book'))
    .patch(query('patch','book'))

app.route('/author')
    .get(query('get', 'author'))
    .post(query('post', 'author'))

app.route('/author/:_id')
    .get(query('getOne', 'author'))
    .delete(query('delete', 'author'))
    .post(query('updatearray', 'author'))
    .put(query('deletearray', 'author'))
    .patch(query('patch', 'author'))

module.exports = express