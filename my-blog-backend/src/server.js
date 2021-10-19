// import express from 'express';
const express = require("express");
// if you are using the latest version of express, you dont have to install body-parser package
// body parser is now added to express
// import bodyParser from 'body-parser';

// allows us to connect to our local db
// import { MongoClient } from 'mongodb';
const MongoClient = require("mongodb");

// mongoose
// usine node.js 'require()'
const mongoose = require('mongoose');
// using ES6 imports
// import mongoose from 'mongoose';

// fake database -> JSON object we modify whenever specific route is hit
// keys of JSON object will be unique name fields of the articles from our front end
// values will be JSON objects that store information about the articles
// const articlesInfo = {
//     'learn-react': {
//         upvotes: 0,
//         comments: []
//     }, 
//     'learn-node': {
//         upvotes: 0,
//         comments: []
//     },
//     'my-thoughts-on-resumes': {
//         upvotes: 0,
//         comments: []
//     },
// };

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

app.get('/api/articles/:name', async (req, res) => {
    try {
        // get the article name from the url parameters
        const articleName = req.params.name;

        // MongoClient.connect -> used to connect to local db
        // 2 arguments
        // #1 URL of the mongodb we want to connect to -> default port is 27107
        // #2 options object -> used to change certain parameters about our connection to mongodb
        // mongodb complains if we dont pass { useNewUrlParser: true }
        // connection is asyncronous, returns a promise -> use async await
        // const client = await MongoClient.connect('mongodb://localhost:27107', { useNewUrlParser: true }, console.log('here'));

        const client = await mongoose.connect('mongodb://localhost:27017', {
            useNewUrlParser: true,
        }, console.log('here'));

        // query the my-blog db
        const db = client.db('my-blog');
        // articleInfo await (reading from db is asyncronous)
        // db.collection() -> tells the db which collection we want it to look in
        // db.collection('articles').findOne({ name: }) -> here we tell it which property to look at, and what value we are looking for
        const articleInfo = await db.collection('articles').findOne({ name: articleName });

        // once retrieved, send a response
        // res.status(200) everything went great!
        // res.status(200).json is the same as .send, but works better when working with json data like we are
        res.status(200).json(articleInfo);

        // close the connection to the db
        client.close();

        // bc we used await several times, for this to work we add async to the callback
        // wrap this code in a try catch block in case something goes wrong with the db operations
    } catch (error) {
        // send a response to the client telling them something went wront
        // 500 is server error
        res.status(500).json({ message: 'Error connecting to the db', error });
    }
});

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
