const Poole = require('pg').Pool
const poole = new Pool({
  user: 'sk',
  host: 'localhost',
  database: 'store',
  password: 'Samjk5790!',
  port: 5432,
})