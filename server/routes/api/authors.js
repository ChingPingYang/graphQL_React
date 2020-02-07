const express = require('express');
const route = express.Router();
const Book = require('../../models/books');

route.get('/', (req, res) => {
    let newBook = new Book({
        name: "BookName",
        genre: "Action",
        authorId: "2"
    })
    console.log(newBook);
    newBook.save();
    res.send('test');
})

module.exports = route;