const Yelp = require('yelp');
const yelpQuery = require('../controller/yelpQuery.js');
const mongoose = require('mongoose');
const keys = require('../config/keys');
mongoose.Promise = require('bluebird');

const Rsvp = mongoose.model('rsvp');

var fetchYelp = new Yelp({
  consumer_key: keys.YELP_CONSUMER_KEY,
  consumer_secret: keys.YELP_CONSUMER_SECRET,
  token: keys.YELP_TOKEN,
  token_secret: keys.YELP_TOKEN_SECRET
});

module.exports = app => {
  app.get('/api/yelp', (req, res) => {
    const term = req.query.term;
    const loc = req.query.location;
    // Need Yelp Search Code Here //
    fetchYelp
      .search({ term: 'bars', location: loc })
      .then(async data => {
        const dbBars = await Rsvp.find({});
        const newData = cleanData(data);
        const dearGod = [];

        newData.map(bar => {
          dbBars.map(dbBar => {
            if (dbBar.barId === bar.barId) {
              bar.count = dbBar.users.length || 0;
            }
          });
        });
        res.send(newData);
      })
      .catch(function(err) {
        console.error(err);
      });
  });
};

function cleanData(data) {
  const newData = [];
  data.businesses.forEach(bar => {
    newData.push({
      barId: bar.id,
      name: bar.name,
      image: bar.image_url,
      count: 0
    });
  });
  return newData;
}
