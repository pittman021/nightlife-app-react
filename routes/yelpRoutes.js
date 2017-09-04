const Yelp = require('yelp');

var fetchYelp = new Yelp({
  consumer_key: 'rKusj6g1DoktiJXfGN8Inw',
  consumer_secret: 'oH0M8SG9Ckx3fybKNmdU1jiI8sc',
  token: '28Ek82ZnjVZBnvaWe0Wdy1-S3736cNQB',
  token_secret: 'NBHcyzDBqO1wyM6ehUhExzo8JQI'
});

module.exports = app => {
  app.get('/api/yelp', (req, res) => {
    const term = req.query.term;
    const loc = req.query.location;
    // Need Yelp Search Code Here //
    fetchYelp
      .search({ term: 'bars', location: loc })
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        console.error(err);
      });
  });
};
