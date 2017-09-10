const mongoose = require('mongoose');
const Rsvp = mongoose.model('rsvp');

module.exports = app => {
  app.get('/rsvp/:id', (req, res) => {
    Rsvp.findOne({ barId: req.params.id }).then(foundBar => {
      if (foundBar) {
        foundBar.users.push(req.user._id);
        foundBar.save(function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log('user added to bar');
          }
        });
      } else {
        new Rsvp({
          barId: req.params.id,
          users: req.user.id
        }).save(function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log('bar added to DB');
          }
        });
      }
    });
  });

  app.post('/rsvp/:id', (req, res) => {
    Rsvp.findOneAndUpdate(
      { barId: req.params.id },
      { $pull: { users: req.user.id } }
    ).then(err => {
      if (err) {
        console.log(err);
      } else {
        console.log('user removed');
      }
    });
  });
};
