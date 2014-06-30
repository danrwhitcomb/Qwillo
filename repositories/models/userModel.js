var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    isAdmin: Boolean,
    dateJoined: Date,
    isActive: Boolean
});

User.plugin(passportLocalMongoose);

User.methods.getFullName = function(){
	return this.firstName + ' ' + this.lastName;
}


module.exports = mongoose.model('User', User);