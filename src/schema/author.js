const graphql = require('graphql')
const Book = require('../models/book')
const {
    GraphQLObjectType,
    GraphQLString,    
    GraphQLID,
    GraphQLList
} = graphql
const BookType = new GraphQLObjectType(require('./book'))

const AuthorType = {
    name: 'Author',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        history: {
            type: GraphQLString
        },
        book: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({
                    authorId: parent._id
                })
            }
        }
    })
}


module.exports = AuthorType