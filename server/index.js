const http = require('http'); //https://nodejs.org/en/docs/guides/getting-started-guide/
// Two seperate module systems
// CommonJS, ES6, and the subdivision of TypeScript
const hostname = '127.0.0.1';
// If there's an env var set, use that. Otherwise, use 3000
const port = process.env.PORT || 3000 ; //80 for unsecure HTTP traffic, 443 for secure HTTPS traffic

// Start variables as "const", then change to "let" if needed


// function(req, res) => {}    OR   (req, res) => {};.
// The difference is that the first one is a function declaration, and the second one is a function expression, which means that the second one is a function that is assigned to a variable.

// When a request is made, the server will respond with "Hello World"
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello New Paltz');
});

// Stops node from closing down, listens to network traffic
server.listen(port, () => 
    console.log(`Server running at http://${hostname}:${port}/`)
);


// For installing dependencies:
// npm install express-handlebars express-session mongoose passport passport-local

// For running the server:
// npm run dev