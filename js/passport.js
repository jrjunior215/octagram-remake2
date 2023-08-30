const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dbConnection = require('../js/database');

passport.use(new GoogleStrategy({
  clientID: '1060557820848-pve84gfkcp0jkbkauk89hg2b17a8rge2.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:4002/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {

  const user = {
    google_id: profile.id,
    username: profile.displayName,
    email: (profile.emails && profile.emails.length > 0) ? profile.emails[0].value : '',
    // email: profile.emails[0].value,
    google_img: (profile.photos && profile.photos.length > 0) ? profile.photos[0].value : ''
  };

  const role = 'USER'
  const img_pic = '/img/profile.png';
  const query_insert_google = `INSERT INTO users (google_id, name, email, role, img) VALUES ('${user.google_id}', '${user.username}', '${user.email}', '${role}', '${user.google_img}')`;

  try {
    const query_google_check = `SELECT * FROM users WHERE google_id = ${user.google_id}`;
    await dbConnection.execute(query_google_check).then(async ([rows]) => {
      if (rows.length > 0) {
        done(null, rows[0]);
      } else {
        const newUser = await dbConnection.execute(query_insert_google);
        done(null, newUser);
      }
    }).catch(err => {
      if (err) throw err;
    });
  } catch (error) {
    done(error, null);
  }
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await dbConnection.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, user[0]);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;