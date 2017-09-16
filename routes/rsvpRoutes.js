const mongoose = require('mongoose');
const Rsvp = mongoose.model('rsvp');
const isAuthenticated = require('../middleware/auth.js');

module.exports = app => {
  // RSVP User //
  app.post('/rsvp/:id', isAuthenticated, async (req, res) => {
    const barWithUser = await Rsvp.find({
      barId: req.params.id,
      users: req.user.id
    });

    // No need to make two queries, clean this up //
    const bar = await Rsvp.findOne({ barId: req.params.id });

    if (barWithUser.length != 0) {
      res.send('user already going');
    } else if (bar) {
      // Bar already in DB, adding user to RSVP list //

      bar.users.push(req.user._id);
      bar.save();
      res.send({ id: bar.barId, addToRsvp: true });
      console.log('added RSVP to existing Bar');
    } else {
      const rsvp = await new Rsvp({
        Id: req.params.id,
        users: req.user.id
      });
      rsvp.save();
      // added new BAR added new RSVP //
      res.send({
        id: req.params.id,
        addToRsvp: true
      });
      console.log('new rsvp created for: ' + req.params.id);
    }
  });

  // Remove RSVP for user //
  app.delete('/rsvp/:id', isAuthenticated, async (req, res) => {
    console.log('delete route');
    const deletedBar = await Rsvp.findOneAndUpdate(
      { barId: req.params.id },
      { $pull: { users: req.user.id } }
    );
    console.log('removed RSVP for:' + deletedBar.barId);
    res.send({
      status: 'delete',
      user: req.user.id,
      id: req.params.id
    });
  });
};
