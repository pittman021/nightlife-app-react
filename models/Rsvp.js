const mongoose = require('mongoose');
const { Schema } = mongoose;

const rsvpSchema = new Schema({
  barId: String,
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

mongoose.model('rsvp', rsvpSchema);
