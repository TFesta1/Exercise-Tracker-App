const mongoose = require("mongoose")
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000 ; //80 for unsecure HTTP traffic, 443 for secure HTTPS traffic
const express = require('express')
const app = express()
const workouts = require('./controllers/workouts')
const path = require('path');

const http = require('http'); //https://nodejs.org/en/docs/guides/getting-started-guide/

const uri = "mongodb+srv://tfest:unsecurePass@cluster0.nptuzeh.mongodb.net/?retryWrites=true&w=majority"
mongoose.set('strictQuery', false); //To prep for the change, use setQuery to true
mongoose.connect(uri)

// Start variables as "const", then change to "let" if needed

// function(req, res) => {}    OR   (req, res) => {};.
// The difference is that the first one is a function declaration, and the second one is a function expression, which means that the second one is a function that is assigned to a variable.

// When a request is made, the server will respond with "Hello World"

// Middleware
app
    .use(express.json())
    .use(express.static(path.join(__dirname, '../client/dist')))

    .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        next();
    })
// Actions
app
    .get('/api/v1/', (req, res) => {
        res.send('Hello World! From Express')
    })
    .use('/api/v1/workouts', workouts)



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