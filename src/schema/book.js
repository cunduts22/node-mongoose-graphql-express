const graphql = require('graphql')
const Author = require('../models/author')
const {
    GraphQLObjectType,
    GraphQLString,    
    GraphQLID,
} = graphql
const AuthorType = new GraphQLObjectType(require('./author'))

const BookType = {
    name: 'Book',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        title: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        created_at: {
            type: GraphQLString
        },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return Author.findById({
                    _id: parent.authorId
                })
            }
        }
    })
}
module.exports = BookType