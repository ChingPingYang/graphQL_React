import React from 'react';
import BookList from './components/BookList';

// Apollo
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import AddBook from './components/AddBook';
const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  clientState: { 
      defaults: {},
      resolvers: {} 
    }
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Book List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
