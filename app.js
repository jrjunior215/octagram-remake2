const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const expressSession = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// SET EXPRESS

const app = express();
const port = '4000';

// GOOGLE LOGIN

// COOKIE SESSION

global.SESSION_USER = null

app.use(expressSession({
  secret: "node secret",
  resave: false,
  saveUninitialized: true,
}));

app.use("*", (req, res, next) => {
  SESSION_USER = req.session.userData
  next()
});

// EXPRESS LAYOUTS

app.use(expressLayouts);
app.set('layout', './layouts/layout');

//SET PAGE LAYOUT

app.use((req, res, next) => {
  res.locals.layout = 'layouts/layout';
  next();
});

// SET VIEW ENGINE

app.set('view engine', 'ejs');

// SET STATIC FILE

app.use("/css", express.static('css'));
app.use("/img", express.static('img'));
app.use("/lib", express.static('lib'));
app.use("/js", express.static('js'));
app.use("/fonts", express.static('fonts'));
app.use('/favicon', express.static(path.join(__dirname, 'img', 'icon.png')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// SET VIEWS AND VIEW ENGINE

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// IMPORT CONTROLLER

// VIEWS

// INDEX PAGE

const indexController = require('./controllers/views/index/indexController');

// AUTH PAGE

const loginController = require('./controllers/views/auth/loginController');
const registerController = require('./controllers/views/auth/registerController');

// MODELS

// AUTH

const registerUserController = require('./controllers/models/auth/registerUserController');
const loginUserController = require('./controllers/models/auth/loginUserController');

// GET

// INDEX PAGE

app.get('/', indexController);

// AUTH PAGE

app.get('/login', loginController);
app.get('/register', registerController);

// POST

// AUTH

app.post('/register/user', registerUserController);
app.post('/login/user', loginUserController);

// SET POST LISTEN

app.listen(port, () => console.log("Server is Running on Port " + port + "."));