const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const methodOverride = require('method-override');
const cookieSession = require('cookie-session');
require('./models/User');
require('./models/Rsvp');
require('./services/passport');

const app = express();

const Rsvp = mongoose.model('rsvp');

mongoose.connect(keys.mongoURI);

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

bodyParser.urlencoded({ extended: true });

require('./routes/rsvpRoutes')(app);
require('./routes/authRoutes')(app);
require('./routes/yelpRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  // express willl serve up prod assets
  // like main.js file, or main.css file

  // express will serve up index.html file
  // if it doesn't recognize route?
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log('server started on ' + PORT);
});
