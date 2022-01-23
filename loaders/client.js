const pg = require('pg');

const resolveUsername = () => {
  return process.env.DB_USER ? process.env.DB_USER : 'sk'
}

const resolvePassword = () => {
  return process.env.DB_PASSWORD ? process.env.DB_PASSWORD : 'Samjk5790!'
}

const resolveEndpoint = () => {
  return process.env.DB_HOST ? process.env.DB_HOST : 'localhost'
}

const resolveName = () => {
  return process.env.DB_NAME ? process.env.DB_NAME : 'store'
}

const client = new pg.Client({
  host: resolveEndpoint(),
  port: 5432,
  user: resolveUsername(),
  password: resolvePassword(),
  database: resolveName()
});

module.exports = client;