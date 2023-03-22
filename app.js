const express = require('express');
const { projects } = require('./data.json');
const path = require('path');
console.log(projects);
const app = express();


app.set('view engine, pug');


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { projects });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.listen();