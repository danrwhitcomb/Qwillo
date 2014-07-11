var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    email: String,
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    isAdmin: {type: Boolean, default: false},
    isConfirmed: {type: Boolean, default: false},
    dateJoined: {type: Date, default: Date.now},
    isActive: {type: Boolean, default: false}
});

User.plugin(passportLocalMongoose);

User.methods.getFullName = function(){
	return this.firstName + ' ' + this.lastName;
}


module.exports = mongoose.model('User', User);