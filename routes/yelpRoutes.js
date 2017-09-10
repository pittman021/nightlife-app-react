const Yelp = require('yelp');
const yelpQuery = require('../controller/yelpQuery.js');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Rsvp = mongoose.model('rsvp');

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

// function queryData(newData) {
//   Rsvp.find({}).then(function(bars) {
//     const dbBars = [];
//     bars.forEach(function(u) {
//       dbBars.push();
//     });
//   });
// }

// async function queryData(newData) {
//   const dearGod = [];
//   const dbBars = await Rsvp.find({});
//
//   newData.map(bar => {
//     dbBars.map(dbBar => {
//       if (dbBar.barId === bar.barId) {
//         dearGod.push({
//           barId: bar.barId,
//           image: bar.image,
//           count: dbBar.users.length
//         });
//       } else {
//         dearGod.push({
//           barId: bar.barId,
//           image: bar.image,
//           count: 0
//         });
//       }
//     });
//   });
//   return dearGod;
// }

//
// function queryData(data) {
//   Rsvp.find({}).then(foundBars => {
//     data.map(bar => {
//       foundBars.map(dbBar => {
//         if (dbBar.barId === bar.barId) {
//           bar.count = dbBar.users.length;
//         }
//       });
//     });
//   });
//   console.log(data);
// }

//   const hello = newData.mapbar => {
//      Rsvp.findOne({ barId: bar.barId }, function(err, foundBar) {
//       if (foundBar) {
//         bar.count = foundBar.users.length;
//       }
//     });
//   });
//   cb(null, hello);
// }

// function combineData(data) {
//   const newData = [];
//   data.businesses.forEach(bar => {
//     const count = foundBar.user.count;
//     newData.push({
//       barId: bar.id,
//       image: bar.img_url,
//       count:
//     });
//
//   });
//   console.log(newData);
// }
