const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const expressSession = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dbConnection = require('./js/database');

// SET EXPRESS

const app = express();
const port = '4002';

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

// GOOGLE LOGIN

passport.use(new GoogleStrategy({
  clientID: '1060557820848-pve84gfkcp0jkbkauk89hg2b17a8rge2.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:4000/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  // try {
  //     // Check if user exists in your database based on Google profile.id
  //     const existingUser = await db.query('SELECT * FROM users WHERE google_id = ?', [profile.id]);
      
  //     if (existingUser.length > 0) {
  //       done(null, existingUser[0]);
  //     } else {
  //       // Create a new user in the database
  //       const newUser = await db.query('INSERT INTO users (google_id, email) VALUES (?, ?)', [profile.id, profile.emails[0].value]);
  //       done(null, newUser);
  //     }
  //   } catch (error) {
  //     done(error, null);
  //   }

  const user = {
    google_id: profile.id,
    username: profile.displayName,
    email: (profile.emails && profile.emails.length > 0) ? profile.emails[0].value : '',
    email: profile.emails[0].value,
    google_img: (profile.photos && profile.photos.length > 0) ? profile.photos[0].value : ''
  };

  const role = 'USER'
  const img_pic = '/img/profile.png';
  const query = `INSERT INTO users (google_id, name, email, role, img) VALUES ('${user.google_id}', '${user.username}', '${user.email}', '${role}', '${user.google_img}',)`;
  console.log(query);
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  // try {
  //   const user = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  //   done(null, user[0]);
  // } catch (error) {
  //   done(error, null);
  // }
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

// HOME PAGE

const homeController = require('./controllers/views/home/homeController');
const searchController = require('./controllers/views/home/searchController');
const settingController = require('./controllers/views/home/settingController');

// CREATOR PAGE

const creatorController = require('./controllers/views/creator/creatorController');

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

// HOME PAGE
app.get('/home', homeController);
app.get('/search', searchController);
app.get('/settings/basic', settingController);

// CREATOR PAGE
app.get('/creator', creatorController);

// POST

// AUTH

app.post('/register/user', registerUserController);
app.post('/login/user', loginUserController);
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/home');
    }
);

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// SET POST LISTEN

app.listen(port, () => console.log("Server is Running on Port " + port + "."));