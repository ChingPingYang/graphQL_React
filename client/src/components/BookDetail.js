import React , { Component }from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getOneBook, mutationDeleteBook, getAllBooks } from '../queries/queries';

class BookDetail extends Component {
    constructor(props) {
        super(props)
        console.log("Child Constructor")
        this.state = {
            child: props._id
        }
    }
    displayBook = () => {
        const book = this.props.getOneBook.book;
        
        if(!book || this.props._id == null) {
            
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
                    <button onClick={()=> {
                        this.props.mutationDeleteBook({
                            variables: {
                                _id: book._id
                            },
                            refetchQueries: [{ query: getAllBooks}]
                        })

                        this.props.resetSelectedBook();
                    }}>Delete this Book</button>
                    <br/>
                    <br/>
                </div>
            )
        }
    }
 
    static getDerivedStateFromProps(props, state){
        console.log('Childre Derived')
        // console.warn("props: ",props)
        // console.warn("state: ",state)
        if(props._id !== state.child) {
            console.log('not same');
            return {child: props._id}
        } else {
            console.log('same')
        }
        return null
    }
    componentDidMount(){
        console.log('Child DidMount')
    }
    render() {
        console.log('Childer render...', this.state.child)
        return(
            <div>
                {
                    this.displayBook()
                }
            </div>
        )
    }
}

export default compose(
    graphql(getOneBook,{
        name:"getOneBook",
        options: (props) => {
            return {
                variables: {
                    _id: props._id
                }
            }
        }
    }),
    graphql(mutationDeleteBook, {name:"mutationDeleteBook"})
    )
    (BookDetail);