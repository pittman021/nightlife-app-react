const passport = require('passport');

module.exports = app => {
  app.get('/', (req, res) => {
    res.send('logging in to google');
  });

  app.get('/auth/google', (req, res) => {
    res.send('logging in to google');
  });
};
