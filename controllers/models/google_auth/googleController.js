const passport = require('../../../js/passport');

module.exports = passport.authenticate('google', { scope: ['profile', 'email'] });