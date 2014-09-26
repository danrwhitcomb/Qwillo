var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Post = new Schema({
	title: String,
	link: String,
	description: String,
	datePosted: Date,
	user: String,
	upvote: Number,
	downvote: Number,
	topic: String,
	flags: Number
});

module.exports = mongoose.model('posts', Post);