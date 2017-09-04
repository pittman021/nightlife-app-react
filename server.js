const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

bodyParser.urlencoded({ extended: true });

require('./routes/authRoutes')(app);
require('./routes/yelpRoutes')(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT);
