const mongoose = require("mongoose")
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000 ; //80 for unsecure HTTP traffic, 443 for secure HTTPS traffic
const express = require('express')
const app = express()
const workouts = require('./controllers/workouts')



const http = require('http'); //https://nodejs.org/en/docs/guides/getting-started-guide/



const uri = "mongodb+srv://tfest:unsecurePass@cluster0.nptuzeh.mongodb.net/?retryWrites=true&w=majority"
mongoose.set('strictQuery', false); //To prep for the change, use setQuery to true
mongoose.connect(uri)

// Start variables as "const", then change to "let" if needed


// function(req, res) => {}    OR   (req, res) => {};.
// The difference is that the first one is a function declaration, and the second one is a function expression, which means that the second one is a function that is assigned to a variable.

// When a request is made, the server will respond with "Hello World"



app
    .get('/', (req, res) => {
        res.send('Hello World! From Express')
    })
    .use('/workouts', workouts)


// Stops node from closing down, listens to network traffic
app.listen(port, () => 
    console.log(`Server running at http://${hostname}:${port}/`)
);


// For installing dependencies:
// npm install express-handlebars express-session mongoose passport passport-local

// For running the server:
// npm run dev