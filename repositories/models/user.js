var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    email: String,
    password: String,
    username: String,
    firstName: String,
    lastName: String,
    isAdmin: Boolean,
    dateJoined: Date,
    isActive: Boolean
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);