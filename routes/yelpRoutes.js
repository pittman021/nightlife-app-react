const Yelp = require('yelp');
const yelpQuery = require('../controller/yelpQuery.js');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const Rsvp = mongoose.model('rsvp');

var fetchYelp = new Yelp({
  consumer_key: keys.yelpConsumerKey,
  consumer_secret: keys.yelpConsumerSecret,
  token: keys.yelpToken,
  token_secret: keys.yelpTokenSecret
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
        const user = req.user ? req.user.id : 0;

        newData.map(bar => {
          dbBars.map(dbBar => {
            if (dbBar.barId === bar.barId) {
              bar.count = dbBar.users.length || 0;

              const idx = dbBar.users.indexOf(user);

              if (idx != -1) {
                bar.userGoing = true;
              }
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
      count: 0,
      userGoing: false
    });
  });
  return newData;
}
