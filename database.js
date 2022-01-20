const { Client } = require('pg')

const client = new Client(process.env.DB_URL); //Configuring PostgresSQL Database

module.exports = client;

const pool = new Pool({
  user: 'sk',
  database: 'store',
  password: 'Samjk5790!',
  port: 5432,
  host: 'localhost',
})
