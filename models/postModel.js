var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Post = new Schema({
	title: String,
	link: String,
	description: String,
	datePosted: Date,
	user: String,
	userId: Schema.Types.ObjectId,
	upvote: Number,
	downvote: Number,
	topic: String,
	topicId: Schema.Types.ObjectId,
	flags: Number
});

module.exports = mongoose.model('posts', Post);