const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
function auth(req, res, next) {
  // extract username and password from the request body
  const { username, password } = req.body;

  // check if the username and password are valid
  if (isValidUser(username, password)) {
    // generate a JWT token with a secret key
    const token = jwt.sign({ username }, 'secret_key');
    
    // attach the token to the response header
    res.set('Authorization', `Bearer ${token}`);
    
    // proceed to the next middleware
    next();
  } else {
    // return an error response if the credentials are invalid
    res.status(401).send('Invalid username or password');
  }
}

});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
