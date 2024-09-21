const mongoose = require('mongoose');

const RecordingSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  loopStatus: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Recording', RecordingSchema);