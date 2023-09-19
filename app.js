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
  SESSION_USER = req.session.userData;
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

// ADMIN PAGE
const adminController = require('./controllers/views/admin/adminController');

// PACKAGE PAGE
const packageCreateController = require('./controllers/views/creator/package/packageCreateController');
const packagePreviewController = require('./controllers/views/creator/package/packagePreviewController');
const packageEditController = require('./controllers/views/creator/package/packageEditController');

// POST PAGE
const postTextController = require('./controllers/views/creator/post/postTextController');

// POST EDIT
const textEditController = require('./controllers/views/creator/post/edit/textEditController');

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

// POST EDIT 
const postEdit = require('./controllers/models/post/edit/postEdit');

// POST DELETE
const postDelete = require('./controllers/models/post/delete/postDelete'); 

// COMMENT
const commentCreate = require('./controllers/models/comment/commentCreate');
const commentController = require('./controllers/models/comment/commentController');
const commentEdit = require('./controllers/models/comment/commentEdit');
const commentDelete = require('./controllers/models/comment/commentDelete');

// CHECKOUT
const checkoutController = require('./controllers/views/checkout/checkoutController');

// PAYPAL
const paymentRoute = require('./controllers/models/payment/paypal');

// MIDDLEWARE
const logIn = require('./middleware/logIn');
const logout = require('./middleware/logOut');
const logOut = require('./middleware/logOut');

// GET

// INDEX PAGE
app.get('/', logout, indexController);

// AUTH PAGE
app.get('/login', logout, loginController);
app.get('/register', logout, registerController);
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
app.get('/home', logIn, homeController);
app.get('/search', logIn, searchController);
app.get('/setting/basic', logIn, settingController);
app.get('/member/navbar', logIn, memberListNav);

// SEARCH
app.get('/search/query', logIn, searchAutoCreatorController);

// CREATOR PAGE
app.get('/creator', logIn, creatorController);
app.get('/members', logIn, memberController);
app.get('/package', logIn, packageController);
app.get('/setting/creator', logIn, settingCreatorController);
app.get('/member/creator', logIn, memberCreator);

// ADMIN PAGE
app.get('/dashboard', logIn, adminController);

// PACKAGE PAGE
app.get('/package/create', logIn, packageCreateController);
app.get('/package/preview', logIn, packagePreviewController);
app.get('/package/edit', logIn, packageEditController);

// POST PAGE
app.get('/post/text', logIn, postTextController); 

// POST EDIT
app.get('/post/edit', logIn, textEditController);

// AUTH
app.post('/register/user', logOut, registerUserController);
app.post('/login/user', loginUserController);

// PROFILE UPDATE
app.post('/profile/user/update', logIn, profileUser);
app.post('/profile/creator/update', profileCreator);

// NEW CREATOR
app.post('/creator/create', logIn, newCreatorController);

// PACKAGE
app.post('/package/data/create', logIn, packageCreate);
app.post('/package/data/edit', logIn, packageEdit);
app.get('/package/delete', logIn, packageDelete);

// POST
app.post('/post/data/create', logIn, postText);

// POST EDIT
app.post('/post/edit/data', logIn, postEdit);

// POST DELETE
app.get('/post/delete', logIn, postDelete);

// PAYPAL
app.use('/paypal', paymentRoute);

// COMMENT 
app.post('/post/comment/create', logIn, commentCreate);
app.post('/post/comment/edit', logIn, commentEdit);
app.get('/post/comment/delete', logIn, commentDelete)
app.get('/comments/:postId', logIn, commentController);

// CHECKOUT
app.get('/checkout/:creator_name', logIn, checkoutController)

// CREATOR PAGE
app.get('/:creator_name', logIn, creatorPageController);

// SET POST LISTEN

app.listen(port, () => console.log("Server is Running on Port " + port + "."));