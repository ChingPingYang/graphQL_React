import React , { Component }from 'react';
import { graphql } from 'react-apollo';
import { getOneBook } from '../queries/queries';

class BookDetail extends Component {
    displayBook = () => {
        const book = this.props.getOneBook.book;
        if(!book) {
            return(
                <div>
                    <h1>No Book Selected</h1>
                </div>
            )
        } else {
            return (
                <div>
                    <h2>{book.name}</h2>
                    <h2>{book.author.name}</h2>
                    <p>{book.genre}</p>
                    <h3>Other books of this author: </h3>
                    <ul>
                        {book.author.books.map((book, index) => <li key={index}>{book.name}</li>)}
                    </ul>
                </div>
            )
        }
    }

    render() {
        return(
            <div>
                {
                    this.displayBook()
                }
            </div>
        )
    }
}

export default graphql(getOneBook,{name:"getOneBook"})(BookDetail);