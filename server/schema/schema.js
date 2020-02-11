const graphql = require('graphql');
const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema, 
        GraphQLID,
        GraphQLInt,
        GraphQLList,
        GraphQLNonNull
     } = graphql;

const Book = require('../models/books');
const Author = require('../models/authors');

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return Author.findById(parent.authorId);
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({authorId: parent._id});
            }
        }
    })
})


const RootQuery = new GraphQLObjectType( {
    name: "RootQuery",
    fields: {
        book: {
            type: BookType,
            args: { _id: { type: GraphQLID } },
            resolve(parent, args) {
                return Book.findById(args._id);
            }
        },
        author: {
            type: AuthorType,
            args: { _id: { type: GraphQLID } },
            resolve(parent, args) {
                return Author.findById(args._id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({});
            }
        }
    }
})


const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args ) {
                let newBook = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return newBook.save()
            }
        },
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args) {
                let newAuthor = new Author({
                    name: args.name,
                    age: args.age
                })
                return newAuthor.save();    
            }
        },
        deleteBook: {
            type: BookType,
            args: {
                _id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                return Book.findOneAndDelete({_id: args._id});
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})