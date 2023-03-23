// Require the necessary modules
const express = require('express');
const { projects } = require('./data.json');
const path = require('path');

// Create a new Express application instance
const app = express();

// Set the views directory and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Serve static files from the public directory
app.use('/static', express.static(path.join(__dirname, 'public')));


// Define the routes

// Home page route
app.get('/', (req, res, next) => {
    res.render('index', { projects });
});

// About page route
app.get('/about', (req, res, next) => {
    res.render('about');
});

// Project page route
app.get('/project/:id', (req, res, next) => {
    // Get the project ID from the request parameters
    const projectId = req.params.id;

    // to get all the projects ID for the error message
    const projectSID = projects.map(proj => proj.id) 

    // Find the project with the specified ID
    const project = projects.find( ({ id }) => id === +projectId); // (( proj ) => proj.id === +projectId); -- the {id} solution can also wrriten like that

    // If the project is found, render the project page with the project data
    if(project) {
        res.render('project', { project, technologies: project.technologies });
    } else {
        // If the project is not found, create a new error object with a custom message
        const err = new Error(`Project Id <strong>-${projectId}-</strong> Is Not Found try to choose One of <strong>${projectSID}</strong> Id's`);
        err.status = 404;
        return next(err);
    }
});

// Error handling middleware

// 404 Not Found middleware
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

// Error middleware for all other errors
app.use((err, req, res, next) => {
    // Set the error status and message
    err.status = err.status || 500;
    err.message = err.message || 'Server Error'
    // Send the error message to the client
    res.status(err.status);
    res.send(`Error ${err.status}: ${err.message}. <br><br><br><a href="/">Back to Home Page</a>`)
});

// Start the server on port 3000
app.listen(3001, () => {
    console.log('im working')
});