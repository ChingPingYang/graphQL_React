import React , { Component }from "react";
import { graphql } from 'react-apollo';
import { getAllBooks } from '../queries/queries';
import BookDetail from "./BookDetail";


class BookList extends Component {
    state = {
        selectedBook: null
    }

    

    displayBook = () => {
        let data = this.props.getAllBooks;
        if(data.loading){
            return <div>Is Loading...</div>
        } else {
            return data.books.map((book, index) => {
                return (
                    <div key={index}>
                        <li onClick={()=> this.setState({selectedBook: book._id})}>{book.name}</li>
                    </div>
                )
            })
        }
    }
    render() {
        return (
            <div>
                <ul>
                    {this.displayBook()}
                </ul>
                <BookDetail _id={this.state.selectedBook}/>
            </div>
        )
    }
}

export default graphql(getAllBooks,
     { name: "getAllBooks",
       option: (props) => {
           return (
            {
               variables: {
                    _id: props._id
                }  
            }
           )
       }
     }
     )(BookList);