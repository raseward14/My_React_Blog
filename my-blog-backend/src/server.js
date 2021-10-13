// import express from 'express';
const express = require("express");
// if you are using the latest version of express, you dont have to install body-parser package
// body parser is now added to express
// import bodyParser from 'body-parser';

// fake database -> JSON object we modify whenever specific route is hit
// keys of JSON object will be unique name fields of the articles from our front end
// values will be JSON objects that store information about the articles
const articlesInfo = {
    'learn-react': {
        upvotes: 0,
        comments: []
    }, 
    'learn-node': {
        upvotes: 0,
        comments: []
    },
    'my-thoughts-on-resumes': {
        upvotes: 0,
        comments: []
    },
};

const app = express();
const PORT = process.env.PORT || 8000;

// MIDDLEWARE
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// app.get('/hello', (req, res) => res.send('Hello!'));
// app.get('/hello/:name', (req, res) => res.send(`Hello ${req.params.name}`))
// app.post('/hello', (req, res) => res.send('Hello!'));
// app.post('/hello', (req, res) => res.send(`Hello ${req.body.name}!`));

// upvote an article
app.post('/api/articles/:name/upvote', (req, res) => {
    const articleName = req.params.name;
    
    articlesInfo[articleName].upvotes += 1;
    // send a response telling the client how many upvotes the articles has
    res.status(200).send(`${articleName} now has ${articlesInfo[articleName].upvotes} upvotes`)
});

// add comment
app.post('/api/articles/:name/add-comment', (req, res) => {
    // pull the username and text properties out of the req.body
    const { username, text } = req.body;
    // get articleName from URL parameters
    const articleName = req.params.name;
    // we dont declare articlesInfo bc its global scope
    articlesInfo[articleName].comments.push({ username, text });
    // send back a response
    res.status(200).send(articlesInfo[articleName]);
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
