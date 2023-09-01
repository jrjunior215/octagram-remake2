const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const expressSession = require('express-session');
const dbConnection = require('./js/database');
const passport = require('./js/passport');

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
const logoutController = require('./controllers/models/auth/logoutController');

// GOOGLE AUTH PAGE
const googleController = require('./controllers/models/google_auth/googleController');
const googleCallBackController = require('./controllers/models/google_auth/googleCallBackController');

// HOME PAGE
const homeController = require('./controllers/views/home/homeController');
const searchController = require('./controllers/views/home/searchController');
const settingController = require('./controllers/views/home/settingController');

// CREATOR PAGE
const creatorController = require('./controllers/views/creator/creatorController');
const memberController = require('./controllers/views/creator/memberController');
const packageController = require('./controllers/views/creator/packageController');
const settingCreatorController = require('./controllers/views/creator/settingCreatorController');

//SEARCH PAGE
const searchAutoCreatorController = require('./controllers/models/search/searchAutoCreatorController');

// MODELS

// AUTH
const registerUserController = require('./controllers/models/auth/registerUserController');
const loginUserController = require('./controllers/models/auth/loginUserController');

// CREATOR
const newCreatorController = require('./controllers/models/creator/newCreatorController');

// GET

// INDEX PAGE
app.get('/', indexController);

// AUTH PAGE
app.get('/login', loginController);
app.get('/register', registerController);
app.get('/logout', logoutController);

// GOOGLE AUTH PAGE
app.get('/auth/google', googleController);
app.get('/auth/google/callback', passport.authenticate('google', { session: false }),
  async (req, res) => {
    const data = req.user;
    req.session.userData = data;
    res.redirect('/home');
});

// app.get('/auth/google/callback', passport.authenticate('google', { session: false }),
//   async (req, res) => {
//     try {
//       const User = require('./models/User');
//       const data = req.user;
//       const { id, role } = data;

//       if (role === "USER") {
//         req.session.userData = data;
//         return res.redirect('/home');
//       } else if (role === "ADMIN") {
//         req.session.userData = data;
//         return res.redirect('/');
//       } else if (role === "CREATOR") {
//         const id_user = id;
//         const Creator = await User.creator_login(id_user);
//         req.session.userData = Creator[0];
//         return res.redirect('/home');
//       } else {
//         req.session.userData = data;
//         return res.redirect('/');
//       }
//     } catch (error) {
//       // Handle any errors that might occur during the processing
//       console.error(error);
//       return res.status(500).send('Internal Server Error');
//     }
// });

// app.get('/auth/google/callback', passport.authenticate('google', { session: false }),
//   async (req, res) => {
//     const User = require('./models/User');
//     const data = req.user;
//     const { id, role } = data
//     if (role === "USER") {
//       req.session.userData = data;
//       return res.redirect('/home');
//     } else if (role === "ADMIN") {
//       req.session.userData = data;
//       return res.redirect('/');
//     } else if (role === "CREATOR") {
//       const id_user = id;
//       const Creator = await User.creator_login(id_user);
//       req.session.userData = Creator[0]
//       return res.redirect('/home');
//     } else {
//       req.session.userData = data;
//       res.redirect('/');
//     }
// });

// app.get('/auth/google/callback', googleCallBackController);

// HOME PAGE
app.get('/home', homeController);
app.get('/search', searchController);
app.get('/setting/basic', settingController);

// SEARCH
app.get('/search/query');

// CREATOR PAGE
app.get('/creator', creatorController);
app.get('/members', memberController);
app.get('/package', packageController);
app.get('/setting/creator', settingCreatorController);

// CREATOR PAGE
app.get('/creator2',);

// POST


// AUTH
app.post('/register/user', registerUserController);
app.post('/login/user', loginUserController);

// NEW CREATOR
app.post('/creator/create', newCreatorController);

// SET POST LISTEN

app.listen(port, () => console.log("Server is Running on Port " + port + "."));