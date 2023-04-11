const express = require("express");
const cors = require("cors");
const session = require('express-session');
require('dotenv').config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("./middleware/logging");
const auth = require("./middleware/auth");
const errorHandler = require("./middleware/errorHandler");
const  productRoute =  require('./routers/productRouter');
const  UserRoute =  require('./routers/userRouter');
const  authRoute =  require('./routers/authRouter');


const app = express();

const db = process.env.MONGO_URI;

const port = process.env.PORT || 8011;

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});

mongoose
  .connect(db)
  .then(() => console.log("database is connected!!!!"))
  .catch((err) => console.log(err));

// app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json({ type: "application/*+json" }));

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));

// parse an HTML body into a string
app.use(bodyParser.text({ type: "text/html" }));

app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: true,
  cookie: {
      secure: false,
      maxAge: 3600000 // 1 hour
  }
}));

// auth.authenticateToken.unless = unless;
// app.use(auth.authenticateToken.unless({
//   path:[
//     {
//       url: '/users/login', 
//       method: ['POST']
//     },
//     {
//       url: '/users/register', 
//       method: ['POST']
//     }
//   ]
// }))


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});


app.use(logger.log);


app.use(express.json());

// Register a new user

app.use('/products', auth.authenticateToken, productRoute);
app.use('/users', auth.authenticateToken, UserRoute);
app.use('/auth', authRoute);


app.use("*", (req, res) => res.status(404).send("invalid url"));
app.use(logger.error);