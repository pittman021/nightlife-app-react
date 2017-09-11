const mongoose = require('mongoose');
const Rsvp = mongoose.model('rsvp');

module.exports = app => {
  // RSVP User //
  app.post('/rsvp/:id', async (req, res) => {
    const barWithUser = await Rsvp.find({
      barId: req.params.id,
      users: req.user.id
    });
    console.log(barWithUser);
    // No need to make two queries, clean this up //
    const bar = await Rsvp.findOne({ barId: req.params.id });
    console.log(bar);

    if (barWithUser.length != 0) {
      res.send('user already going');
    } else if (bar) {
      bar.users.push(req.user._id);
      bar.save();
      res.send({
        status: 'going',
        user: req.user.id,
        bar: req.params.id
      });
    } else {
      new Rsvp({
        barId: req.params.id,
        users: req.user.id
      }).save(then => {
        res.send({
          status: 'going',
          user: req.user.id,
          bar: req.params.id
        });
      });
    }
  });

  // Rsvp.findOneAndUpdate(
  //   { barId: req.params.id },
  //    newRsvp,
  //   { upsert: true, new:true },
  //
  // )
  // })
  //
  //
  // const bar = await Rsvp.find({ barId: req.params.id });
  // console.log(bar);
  //
  // if (bar) {
  //   console.log('found the bar');
  //   const user = await bar.find({ users: req.user._id });
  // } else {
  // }

  // .then(foundBar => {
  //   if(foundBar) {
  //     Rsvp.find({
  //       barId: req.params.id,
  //       $in: {}
  //     })
  //   }

  //   if (foundBar && foundBar.users.contains(req.user._id)) {
  //     console.log('found the user!!!');
  //   } else if (foundBar) {
  //     foundBar.users.push(req.user._id);
  //     foundBar.save();
  //     console.log('found bar, added user to rsvp');
  //   } else {
  //     new Rsvp({
  //       barId: req.params.id,
  //       users: req.user.id
  //     }).save(function(err) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log('bar added to DB');
  //       }
  //     });
  //   }
  // });

  // Remove RSVP for user //
  app.delete('/rsvp/:id', (req, res) => {
    console.log('delete route');
    Rsvp.findOneAndUpdate(
      { barId: req.params.id },
      { $pull: { users: req.user.id } }
    ).then(err => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          status: 'delete',
          user: req.user.id,
          bar: req.params.id
        });
      }
    });
  });
};
