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
const googleLoginController = require('./controllers/models/google_auth/googleLoginController');
const googleCallBackController = require('./controllers/models/google_auth/googleCallBackController');

// HOME PAGE
const homeController = require('./controllers/views/home/homeController');
const searchController = require('./controllers/views/home/searchController');
const settingController = require('./controllers/views/home/settingController');
const memberListNav = require('./controllers/models/member/memberListNav');

// CREATOR PAGE
const creatorController = require('./controllers/views/creator/creatorController');
const memberController = require('./controllers/views/creator/memberController');
const packageController = require('./controllers/views/creator/package/packageController');
const settingCreatorController = require('./controllers/views/creator/settingCreatorController');
const memberCreator = require('./controllers/models/member/memberCreator');

// PACKAGE PAGE
const packageCreateController = require('./controllers/views/creator/package/packageCreateController');
const packagePreviewController = require('./controllers/views/creator/package/packagePreviewController');
const packageEditController = require('./controllers/views/creator/package/packageEditController');

// POST PAGE
const postTextController = require('./controllers/views/creator/post/postTextController');

//SEARCH PAGE
const searchAutoCreatorController = require('./controllers/models/search/searchAutoCreatorController');

// MODELS

// AUTH
const registerUserController = require('./controllers/models/auth/registerUserController');
const loginUserController = require('./controllers/models/auth/loginUserController');

// PROFILE UPDATE
const profileUser = require('./controllers/models/profile/profileUser');
const profileCreator = require('./controllers/models/profile/profileCreator');

// CREATOR
const newCreatorController = require('./controllers/models/creator/newCreatorController');

// PACKAGE
const packageCreate = require('./controllers/models/package/packageCreate');
const packageEdit = require('./controllers/models/package/packageEdit');
const packageDelete = require('./controllers/models/package/packageDelete');

// CREATOR PAGE
const creatorPageController = require('./controllers/views/home/creator/creatorPageController')

// POST 
const postText = require('./controllers/models/post/postText');

// GET

// INDEX PAGE
app.get('/', indexController);

// AUTH PAGE
app.get('/login', loginController);
app.get('/register', registerController);
app.get('/logout', logoutController);

// GOOGLE AUTH PAGE
app.get('/auth/google/login', googleLoginController);
app.get('/auth/google', googleController);
app.get('/auth/google/callback', passport.authenticate('google', { session: false }),
  async (req, res) => {
    const data = req.user;
    req.session.userData = data;
    res.redirect('/auth/google/login');
});

// HOME PAGE
app.get('/home', homeController);
app.get('/search', searchController);
app.get('/setting/basic', settingController);
app.get('/member/navbar', memberCreator);

// SEARCH
app.get('/search/query', searchAutoCreatorController);

// CREATOR PAGE
app.get('/creator', creatorController);
app.get('/members', memberController);
app.get('/package', packageController);
app.get('/setting/creator', settingCreatorController);
app.get('/member/creator', memberCreator);

// PACKAGE PAGE
app.get('/package/create', packageCreateController);
app.get('/package/preview', packagePreviewController);
app.get('/package/edit', packageEditController);

// POST PAGE
app.get('/post/text', postTextController); 

// CREATOR PAGE
app.get('/creator2', postText);

// POST

// AUTH
app.post('/register/user', registerUserController);
app.post('/login/user', loginUserController);

// PROFILE UPDATE
app.post('/profile/user/update', profileUser);
app.post('/profile/creator/update', profileCreator);

// NEW CREATOR
app.post('/creator/create', newCreatorController);

// PACKAGE
app.post('/package/data/create', packageCreate);
app.post('/package/data/edit', packageEdit);
app.get('/package/delete', packageDelete);

// POST
app.post('/post/data/create', postText);

// MEMBER SUB
app.get('/:creator_name/join',  )

// CREATOR PAGE
app.get('/:creator_name', creatorPageController);

// SET POST LISTEN

app.listen(port, () => console.log("Server is Running on Port " + port + "."));