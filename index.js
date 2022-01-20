const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');
const port = process.env.PORT || 8080;
const path = require('path');
const session = require('express-session');
const open = require('open');
const { Pool } = require('pg');

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

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)


// Route to Homepage
app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/pages/home.html');
});

// Route to Login Page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/pages/login.html');
});

const Poole = require('pg').Pool
const poole = new Pool({
  user: 'sk',
  host: 'localhost',
  database: 'store',
  password: 'Samjk5790!',
  port: 5432,
})

app.post('/login', function(request, response) {
	const name = request.body.name;
	const password = request.body.password;
	if (name && password) {
		poole.query('SELECT * FROM customer WHERE name = ? AND password = ?', [name, password], function(error, results, fields) {
			if (name=='customer1' && password == 'test1') {
				request.session.loggedin = true;
				request.session.name = name;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  console.log(`HTTPS Server running on port ${port}`);
});
