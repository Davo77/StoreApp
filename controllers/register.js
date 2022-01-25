const  bcrypt  =  require("bcrypt");

const  client  =  require("../configs/database");

const  jwt  =  require("jsonwebtoken");

//Registration Function

exports.register  =  async (req, res) => {
const { name, password } =  req.body;
try {
const  data  =  await client.query(`SELECT * FROM customer WHERE name= $1;`, [name]); //Checking if user already exists
const  arr  =  data.rows;
if (arr.length  !=  0) {
return  res.status(400).json({
error: "Name already in database",
});
}
else {
bcrypt.hash(password, 10, (err, hash) => {
if (err)
res.status(err).json({
error: "Server error",
});
const customer  = {
name,
password: hash,
};
var  flag  =  1; //Declaring a flag

//Inserting data into the database

client
.query(`INSERT INTO customer (name, password) VALUES ($1,$2);`, [customer.name, customer.password], (err) => {

if (err) {
flag  =  0; //If user is not inserted is not inserted to database assigning flag as 0/false.
console.error(err);
return  res.status(500).json({
error: "Database error"
})
}
else {
flag  =  1;
res.status(200).send({ message: 'Customer added to database, not verified' });
}
})
if (flag) {
const  token  = jwt.sign( //Signing a jwt token
{
name: customer.name
},
process.env.SECRET_KEY
);
};
});
}
}
catch (err) {
console.log(err);
res.status(500).json({
error: "Database error while registring user!", //Database connection error
});
};
}
