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

const Rsvp = mongoose.model('rsvp');

mongoose.connect(keys.mongoURI);

const app = express();

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

app.get('/', (req, res) => {
  res.send('Home');
});

require('./routes/rsvpRoutes')(app);
require('./routes/authRoutes')(app);
require('./routes/yelpRoutes')(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log('server started on ' + PORT);
});
