var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Post = new Schema({
	title: String,
	link: String,
	description: String,
	datePosted: Date,
	user: String,
	upvote: Integer,
	downvote: Integer,
	topic: String,
	flags: Integer
});

module.exports.Post = mongoose.model('Post', Post);