require('dotenv').config() //npm i dotenv
const hostname = '127.0.0.1';
// const port = process.env.PORT || 3000 ; //80 for unsecure HTTP traffic, 443 for secure HTTPS traffic
const port = process.env.PORT || 3000;
const express = require('express')
const users = require('./controllers/users')
const app = express()
const workouts = require('./controllers/workouts')
const path = require('path');
const { requireLogin, parseAuthorizationHeader } = require('./middleware/authorization')

const http = require('http'); //https://nodejs.org/en/docs/guides/getting-started-guide/


// Start variables as "const", then change to "let" if needed

// function(req, res) => {}    OR   (req, res) => {};.
// The difference is that the first one is a function declaration, and the second one is a function expression, which means that the second one is a function that is assigned to a variable.

// When a request is made, the server will respond with "Hello World"

// console.log(__dirname)

// Middleware
app
    .use(express.json())
    .use(express.static(path.join(__dirname, '../client/dist')))

    .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        // Make sure OPTIONS request are always allowed
        // That way pre-flight requests don't fail
        if(req.method === 'OPTIONS') {
            return res.status(200).send({})
        }
        next();
    })

    .use(parseAuthorizationHeader)
// Actions
app
    .get('/api/v1/', (req, res) => {
        res.send('Hello World! From Express')
    })
    // .use('/api/v1/workouts', requireLogin(), workouts)
    // .use('/api/v1/workouts', workouts)
    .use('/api/v1/workouts', requireLogin(), workouts)
    .use('/api/v1/users', users)



// Error handling
app
    .use((err, req, res, next) => {
        console.error(err);
        const msg = {
            status: err.code || 500,
            error: err.message || 'Internal Server Error',
            isSuccess: false
        }
        res.status(msg.status).json(msg)
    })


// Catch all
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

// Stops node from closing down, listens to network traffic
app.listen(port, () => 
    console.log(`Server running at http://${hostname}:${port}/`)
);


// For installing dependencies:
// npm install express-handlebars express-session mongoose passport passport-local

// For running the server:
// npm run dev