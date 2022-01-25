const bcrypt = require("bcrypt");

const client = require("../configs/database");

const jwt = require("jsonwebtoken");

//Login Function
exports.login = async (req, res) => {
const { name, password } = req.body;
try {
const data = await client.query(`SELECT * FROM customer WHERE name= $1;`, [name]) //Verifying if the user exists in the database
const customer = data.rows;
if (customer.length === 0) {
res.status(400).json({
error: "User is not registered, Sign Up first",
});
}
else {
bcrypt.compare(password, customer[0].password, (err, result) => { //Comparing the hashed password
if (err) {
res.status(500).json({
error: "Server error",
});
} else if (result === true) { //Checking if credentials match
const token = jwt.sign(
{
name: name,
},
process.env.SECRET_KEY
);
res.status(200).json({
message: "User signed in!",
token: token,
});
}
else {
//Declaring the errors
if (result != true)
res.status(400).json({
error: "Enter correct password!",
});
}
})
}
} catch (err) {
console.log(err);
res.status(500).json({
error: "Database error occurred while signing in!", //Database connection error
});
};
};
