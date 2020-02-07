require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT | 8000;

// GraphQL!!
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const connectDB = require('./config/db');
connectDB();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))


app.listen(PORT, () => {
    console.log(`Server is up and Running...${PORT}`);
})