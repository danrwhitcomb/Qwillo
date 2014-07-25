var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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


User.methods.getFullName = function(){
	return this.firstName + ' ' + this.lastName;
}

User.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if(err) return cb(err);
		cb(null, isMatch);
	});
};


module.exports = mongoose.model('User', User);