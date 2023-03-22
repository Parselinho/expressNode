const express = require('express');
const { projects } = require('./data.json');
const path = require('path');
const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/static', express.static(path.join(__dirname, 'public')));


app.get('/', (req, res, next) => {
    res.render('index', { projects });
    // res.json({ projects });
});

app.get('/about', (req, res, next) => {
    res.render('about');
});

app.get('/project/:id', (req, res, next) => {
    const projectId = req.params.id;
    const projectSID = projects.map(proj => proj.id) // to get all the projects ID for the error message
    const project = projects.find( ({ id }) => id === +projectId); // (( proj ) => proj.id === +projectId); -- the {id} solution can also wrriten like that
    if(project) {
        res.render('project', { project });
    } else {
        const err = new Error(`Project Id <strong>-${projectId}-</strong> Is Not Found try to choose One of <strong>${projectSID}</strong> Id's`);
        err.status = 404;
        return next(err);
    }
});

app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    err.status = err.status || 500;
    err.message = err.message || 'Server Error'
    res.status(err.status);
    res.send(`Error ${err.status}: ${err.message}. <br><br><br><a href="/">Back to Home Page</a>`)
});

app.listen(3001, () => {
    console.log('im working')
});