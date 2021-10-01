import express from 'express';
import bodyParser from 'body-parser';

app.use(bodyParser.json());

const app = express();

app.get('/hello', (req, res) => res.send('Hello!'));
// app.post('/hello', (req, res) => res.send('Hello!'));
app.post('/hello', (req, res) => res.send(`Hello ${req.body.name}!`));


app.listen(8000, () => console.log('Listening on port 8000'));
