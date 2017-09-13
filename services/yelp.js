const Yelp = require('yelp');

fetchYelp
  .search({ term: 'bars', location: loc })
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    console.error(err);
  });
