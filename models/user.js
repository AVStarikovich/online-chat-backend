const mongoose = require('mongoose');
const crypto = require('crypto');

let Schema = new mongoose.Schema({
  login: { type: String, require: true },
  password: { type: String, require: true },
  created: { type: Date },
  lastAction: { type: Date }
});

Schema.statics.addUser = (login = '111', pass = '111') => {
  let password = crypto.createHash('md5').update(pass).digest('hex');
  let User = mongoose.model('User', Schema);
  let user = new User({
    login,
    password,
    created: Date.now(),
    lastAction: Date.now(),
  });

  return user.save();
};

Schema.methods.updateActivity = (some) => {
  console.log('some in user model', some);
};

module.exports = mongoose.model('User', Schema);