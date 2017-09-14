const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // query contains the google user code, passport auto handles this //
  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/google/fail' }),
    function(req, res) {
      res.redirect('/');
    }
  );

  app.get('auth/google/fail', function(req, res) {
    res.send('google fail');
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });
};
