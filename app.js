const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const expressSession = require('express-session');
const dbConnection = require('./js/database');
const passport = require('./js/passport');
const { SERVER_PORT, SERVER_IP } = require('./js/server_setting');
const cron = require('node-cron');

// SET EXPRESS

const app = express();

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

// SET WORK TIME 
const paypalCheck = require('./js/paypal/paypal_check');
const income = require('./js/income/income');

// ทำงานหลังจาก run

paypalCheck.processPaypalStatus();

// ทุกๆวันที่ 1 ของทุกเดือน

cron.schedule('0 0 1 * *', async () => {
  await income.processIncome();
});

// ทุกๆเที่ยงวัน ของทุกวัน

cron.schedule('0 12 * * *', async () => {
  await paypalCheck.processPaypalStatus();
});

// cron.schedule('* * * * * *', async () => {
//   const now = new Date();
//   const time = now.toLocaleTimeString();
//   console.log(time);
// });

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

// HOME PAGE
const homeController = require('./controllers/views/home/homeController');
const searchController = require('./controllers/views/home/searchController');
const settingController = require('./controllers/views/home/settingController');
const subscribeController = require('./controllers/views/home/subscribeController');
const memberSub = require('./controllers/models/member/memberSub');
const memberListNav = require('./controllers/models/member/memberListNav');
const settingAccountController = require('./controllers/views/home/settingAccountController');
const creatorPackageController = require('./controllers/views/home/creator/creatorPackageController');
const creatorAboutUserController = require('./controllers/views/home/creator/creatorAboutController');

// CREATOR PAGE
const creatorController = require('./controllers/views/creator/creatorController');
const memberController = require('./controllers/views/creator/memberController');
const packageController = require('./controllers/views/creator/package/packageController');
const payoutController = require('./controllers/views/creator/payoutController');
const settingCreatorController = require('./controllers/views/creator/settingCreatorController');
const memberCreator = require('./controllers/models/member/memberCreator');
const creatorAboutController = require('./controllers/views/creator/creatorAboutController');
const categoryCreator = require('./controllers/models/category/categoryCreator');

// ADMIN PAGE
const adminController = require('./controllers/views/admin/adminController');
const adminMemberController = require('./controllers/views/admin/adminMemberController');
const adminMemberCreatorController = require('./controllers/views/admin/adminMemberCreatorController');
const adminCategoryController = require('./controllers/views/admin/adminCategoryController');
const memberAdmin = require('./controllers/models/member/memberAdmin');
const memberAdminCreator = require('./controllers/models/member/memberAdminCreator');
const categoryAdmin = require('./controllers/models/category/categoryAdmin');
const adminMemberNewCreatorController = require('./controllers/views/admin/adminMemberNewCreatorController');
const memberAdminNewCreator = require('./controllers/models/member/memberAdminNewCreator');
const adminMemberCheckController = require('./controllers/views/admin/adminMemberCheckController');

// PACKAGE PAGE
const packageCreateController = require('./controllers/views/creator/package/packageCreateController');
const packagePreviewController = require('./controllers/views/creator/package/packagePreviewController');
const packageEditController = require('./controllers/views/creator/package/packageEditController');

// POST PAGE
const postTextController = require('./controllers/views/creator/post/postTextController');
const postImageController = require('./controllers/views/creator/post/postImageController');

// POST EDIT
const textEditController = require('./controllers/views/creator/post/edit/textEditController');

//SEARCH PAGE
const searchAutoCreatorController = require('./controllers/models/search/searchAutoCreatorController');
const searchAutoCategoryController = require('./controllers/models/category/categorySerach');

// MODELS

// AUTH
const registerUserController = require('./controllers/models/auth/registerUserController');
const loginUserController = require('./controllers/models/auth/loginUserController');
const userPasswordChange = require('./controllers/models/profile/userPasswordChange');

// PROFILE UPDATE
const profileUser = require('./controllers/models/profile/profileUser');
const profileCreator = require('./controllers/models/profile/profileCreator');

// CREATOR
const newCreatorController = require('./controllers/models/creator/newCreatorController');
const creatorConfirm = require('./controllers/models/creator/creatorConfirm');
const creatorDeny = require('./controllers/models/creator/creatorDeny');

// PACKAGE
const packageCreate = require('./controllers/models/package/packageCreate');
const packageEdit = require('./controllers/models/package/packageEdit');
const packageDelete = require('./controllers/models/package/packageDelete');

// CREATOR PAGE
const creatorPageController = require('./controllers/views/home/creator/creatorPageController');
const creatorEdit = require('./controllers/models/creator/creatorsEdit');

// POST 
const postText = require('./controllers/models/post/postText');
const postImage = require('./controllers/models/post/postImage');

// POST EDIT 
const postEdit = require('./controllers/models/post/edit/postEdit');

// POST DELETE
const postDelete = require('./controllers/models/post/delete/postDelete');

// COMMENT
const commentCreate = require('./controllers/models/comment/commentCreate');
const commentController = require('./controllers/models/comment/commentController');
const commentEdit = require('./controllers/models/comment/commentEdit');
const commentDelete = require('./controllers/models/comment/commentDelete');

// MEMBERSHIP
const memberCreatorList = require('./controllers/models/member/memberCreatorList');
const memberCancel = require('./controllers/models/member/memberCancel');
const memberCreatorPayout = require('./controllers/models/member/memberCreatorPayout');

// CHECKOUT
const checkoutController = require('./controllers/views/checkout/checkoutController');
const reorderBetter = require('./controllers/models/reorder/reoderBetter');
const reorderWores = require('./controllers/models/reorder/reoderWores');

// PAYPAL
const paymentRoute = require('./controllers/models/payment/paypal_payment');

// INCOME
const IncomeCreator = require('./controllers/models/income/IncomeCreator');

// CREDIT
const creditCreate = require('./controllers/models/credit/creditCreate');
const creditEdit = require('./controllers/models/credit/creditEdit');


// CATEGORY
const categoryCreate = require('./controllers/models/category/categoryCreate');
const categoryCreatorEdit = require('./controllers/models/category/categoryCreatorEdit');

// MIDDLEWARE
const logIn = require('./middleware/logIn');
const logout = require('./middleware/logOut');
const logOut = require('./middleware/logOut');
const { log } = require('console');

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
app.get('/subscribe', logIn, subscribeController);
app.get('/setting/basic', logIn, settingController);
app.get('/member/subscribe', logIn, memberSub);
app.get('/member/navbar', logIn, memberListNav);
app.get('/setting/account', logIn, settingAccountController);

// SEARCH
app.get('/search/query', logIn, searchAutoCreatorController);
app.get('/category/query', logIn, searchAutoCategoryController);

// CREATOR PAGE
app.get('/creator', logIn, creatorController);
app.get('/members', logIn, memberController);
app.get('/package', logIn, packageController);
app.get('/payout', logIn, payoutController);
app.get('/setting/creator', logIn, settingCreatorController);
app.get('/member/creator', logIn, memberCreator);
app.get('/creator/about', logIn, creatorAboutController);
app.get('/category/creator', logIn, categoryCreator);

// ADMIN PAGE
app.get('/dashboard', logIn, adminController);
app.get('/admin/members', logIn, adminMemberController);
app.get('/admin/members/creator', logIn, adminMemberCreatorController);
app.get('/admin/members/reg_creator', logIn, adminMemberNewCreatorController);
app.get('/admin/category', logIn, adminCategoryController);
app.get('/member/admin', logIn, memberAdmin);
app.get('/member/admin/creator', logIn, memberAdminCreator);
app.get('/member/admin/reg_creator', logIn, memberAdminNewCreator);
app.get('/category/admin', logIn, categoryAdmin);
app.get('/admin/members/check', logIn, adminMemberCheckController);

// PACKAGE PAGE
app.get('/package/create', logIn, packageCreateController);
app.get('/package/preview', logIn, packagePreviewController);
app.get('/package/edit', logIn, packageEditController);

// POST PAGE
app.get('/post/text', logIn, postTextController);
app.get('/post/image', logIn, postImageController);

// POST EDIT
app.get('/post/edit', logIn, textEditController);

// AUTH
app.post('/register/user', logOut, registerUserController);
app.post('/login/user', loginUserController);

// PROFILE UPDATE
app.post('/profile/user/update', logIn, profileUser);
app.post('/profile/creator/update', profileCreator);
app.post('/profile/user/password', logIn, userPasswordChange);

// CREATOR
app.post('/creator/create', logIn, newCreatorController);
app.post('/creator/edit', logIn, creatorEdit);
app.get('/admin/members/confirm', logIn, creatorConfirm);
app.get('/admin/members/deny', logIn, creatorDeny);

// PACKAGE
app.post('/package/data/create', logIn, packageCreate);
app.post('/package/data/edit', logIn, packageEdit);
app.get('/package/delete', logIn, packageDelete);

// POST
app.post('/post/data/create', logIn, postText);
app.post('/post/img/create', logIn, postImage);

// POST EDIT
app.post('/post/edit/data', logIn, postEdit);

// POST DELETE
app.get('/post/delete', logIn, postDelete);

// PAYPAL
app.use('/paypal', paymentRoute);

// INCOME
app.get('/income/creator', logIn, IncomeCreator);

// CREDIT
app.post('/credit/create', logIn, creditCreate);
app.post('/credit/edit', logIn, creditEdit);
// COMMENT 
app.post('/post/comment/create', logIn, commentCreate);
app.post('/post/comment/edit', logIn, commentEdit);
app.get('/post/comment/delete', logIn, commentDelete)
app.get('/comments/:postId', logIn, commentController);

// MEMBERSHIP
app.get('/memberships/:id_package', logIn, memberCreatorList);
app.get('/member/cancel', logIn, memberCancel);
app.get('/member/creator/payout', logIn, memberCreatorPayout);

// CATEGORY
app.post('/category/create', logIn, categoryCreate);
app.post('/category/edit', logIn, categoryCreatorEdit);

// CHECKOUT
app.get('/checkout/:creator_name', logIn, checkoutController);
app.get('/checkout/reorder_wores/:creator_name', logIn, reorderWores);
app.get('/checkout/reorder_better/:creator_name', logIn, reorderBetter);

// CREATOR PAGE
app.get('/:creator_name', logIn, creatorPageController);
app.get('/:creator_name/packages', logIn, creatorPackageController);
app.get('/:creator_name/about', logIn, creatorAboutUserController);


// SET POST LISTEN

app.listen(SERVER_PORT, () => console.log("Server is Running on Port " + SERVER_PORT + " and Server ip : " + SERVER_IP + "."));