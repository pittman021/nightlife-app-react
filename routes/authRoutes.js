const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// GOOGLE AUTH ROUTES //

const GOOGLE_CLIENT_ID = '936081905425-kah8hm08e1ug3m9evvlbtktnqbg56mgv.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'AGAy-2undjEMu8XOg2MGUIMr';

passport.use(new GoogleStrategy({
  cliendID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://nightlife-app-react.herokuapp.com/'
},
function(accessToken, refreshToken, profile, cb) {
  // find user or create one
});
);

app.get('/auth/google', (req, res) => {
  res.send('logging in to google');
});
