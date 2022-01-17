const { Pool} = require('pg')

const pool = new Pool({
  user: 'sk',
  database: 'store',
  password: 'Samjk5790!',
  port: 5432,
  host: 'localhost',
})
