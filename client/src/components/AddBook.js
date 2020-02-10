import React ,{ Component } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getAllAuthors, mutationAddBook, getAllBooks } from '../queries/queries';


class AddBook extends Component {
    state = {
        name: "",
        genre: "",
        authorId: ""
    }
    handleOnChange = (e) => {
        let value = e.target.value;
        this.setState({
            [e.target.id]: value
        })
    }
    handleSubmit =  (e) => {
            e.preventDefault();
            this.props.mutationAddBook({
                variables: {
                    name: this.state.name,
                    genre:this.state.genre,
                    authorId: this.state.authorId
                },
                refetchQueries: [{ query: getAllBooks }]
            });
    }

    getAuthors = () => {
        const data = this.props.getAllAuthors;
        if(data.loading) {
            return(<option disabled>Loading...</option>)
        } else {
        return ( data.authors.map(author => <option key={author._id} value={author._id}>{author.name}</option>))
        }
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="name">BookName: </label>
                        <input type="text" id="name" onChange={this.handleOnChange}/>
                    </div>
                    <br/>
                    <div>
                        <label >Genre: </label>
                        <input type="text" id="genre" onChange={this.handleOnChange}/>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor="author">Author: </label>
                        <select id="authorId" onChange={this.handleOnChange}>
                            <option>Select an author</option>
                            {this.getAuthors()}
                        </select>
                    </div>

                    <button type="submit">+</button>
                </form>
            </div>
        )
    }
}

export default compose(
    graphql(getAllAuthors, {name:"getAllAuthors"}),
    graphql(mutationAddBook, {name:"mutationAddBook"})
)(AddBook);