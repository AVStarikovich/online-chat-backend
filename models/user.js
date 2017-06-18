import mongoose from 'mongoose';

let Schema = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String },
  created: { type: Date, default: Date.now() },
  lastActivity: { type: Date, default: Date.now() }
});

Schema.methods.updateActivity = async function() {
  this.lastActivity = Date.now();
  return this.save();
};

module.exports = mongoose.model('User', Schema);
