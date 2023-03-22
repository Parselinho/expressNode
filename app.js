const express = require('express');
const { projects } = require('./data.json');
const path = require('path');
const app = express();


app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render('index', { projects });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/project/:id', (req, res) => {
    const projectId = req.params.id;
    const project = projects.find(proj => proj.id === projectId);
    res.render('project', { project });
});

app.listen(3001, () => {
    console.log('im working')
});