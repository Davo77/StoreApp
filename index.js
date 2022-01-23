const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');
const session = require('express-session');
const fs = require('fs');
const client = require('./loaders/client.js');
const open = require('open');
const fetch = require('node-fetch');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/', function(request, response) {
	response.sendFile(path.join(__pages + '/login.html'));
});

// Route to Homepage
app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/pages/home.html');
});

// Route to Login Page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/pages/login.html');
});


client.connect()
 .then(() => console.log('DB client connected'))
 .catch((e) => console.log('DB connection error', e))

app.get("/health", (req, res) => {
  res.status(200).json({
    message: { status: 'OK' }
  })
})

const productsAPI = require('./api/productsAPI');
app.use(productsAPI);

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  console.log(`HTTP Server running on port ${port}`);
});
