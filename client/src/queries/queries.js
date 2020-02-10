import { gql } from 'apollo-boost';

const getOneBook = gql`
    query($_id: ID!){
        book(_id: $_id){
            name,
            genre,
            author{
                name,
                books{
                    name,
                }
            }
        }
    }
`


const getAllBooks = gql`
    {
        books{
            _id,
            name,
            genre,
            author{
                name
            }
        }
    }
`

const getAllAuthors = gql`
    {
        authors{
            name,
            _id
        }
    }
`

const mutationAddBook = gql`
    mutation addBook($name: String!, $genre: String!, $authorId: String!){
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            name,
            _id
        }
    }
`


export { getAllBooks, getAllAuthors, mutationAddBook, getOneBook };