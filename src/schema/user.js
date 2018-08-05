const mongoose = require('mongoose')
const graphql = require('graphql')
const Book = require('../models/book')
const Author = require('../models/author')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} = graphql
const BookType = new GraphQLObjectType(require('./book'))
const AuthorType = new GraphQLObjectType(require('./author'))
const UserType = {
    name: 'User',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        address: {
            type: GraphQLString
        },
        phone_number: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        gender: {
            type: GraphQLString
        },
        birthday: {
            type: GraphQLString
        },
        origin: {
            type: GraphQLString
        },
        book: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                const b = Book.find()
                return b.then(res => {
                    let a = [];
                    for (let obj of parent.Books) {
                        let c = _.find(res, {
                            _id: obj._id
                        })
                        a.push(c)
                    }
                    return a
                })

            },
            author: {
                type: AuthorType,
                resolve(parent, args) {
                    return Author.find(parent.authorId)
                }
            }
        },
        created_at: {
            type: GraphQLString
        },
    })
}

module.exports = UserType