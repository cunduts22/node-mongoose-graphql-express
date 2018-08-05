const graphql = require('graphql')
const Author = require('../models/author')
const Book = require('../models/book')
const User = require('../models/user')
const _ = require('lodash')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
} = graphql

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        _id: {type: GraphQLID},
        name: {type: GraphQLString},
        history: {type: GraphQLString},    
        book: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({authorId: parent._id})
            }
        }
    })
})

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        _id: { type: GraphQLID },
        title: { type: GraphQLString },
        genre: { type: GraphQLString },     
        created_at: {
            type: GraphQLString
        },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return Author.findById({_id:parent.authorId})
            }
        }
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: {type: GraphQLID},
        name: {type: GraphQLString},
        address: {type: GraphQLString},
        phone_number: {type: GraphQLString},
        email: {type: GraphQLString},
        gender: {type: GraphQLString},
        birthday: {type: GraphQLString},
        origin: {type: GraphQLString},        
        book: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {     
                console.log(UserType)
                const b = Book.find()
                return b.then(res => {
                    let a = [];                    
                    for(let obj of parent.Books) {
                        let c = _.find(res, {_id: obj._id})
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
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        book: {
            type: BookType,
            args: { _id: {type: GraphQLID} },
            resolve(parent, args) {                
                return Book.findById(args._id)
            }
        }, 
        author: {
            type: AuthorType,
            args: { _id: {type: GraphQLID } },
            resolve(parent, args) {
                return Author.findById(args._id)
            }
        },
        user: {
            type: UserType,
            args: {_id: {type: GraphQLID}},
            resolve(parent, args) {
                return User.findById(args._id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({})
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})