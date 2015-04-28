var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Post = new Schema({
	title: String,
	link: String,
	description: String,
	datePosted: Date,
	userId: {type: Schema.Types.ObjectId, ref: 'users'},
	upvote: {type:Number, default: 0},
	downvote: {type:Number, default: 0},
	topicId: {type: Schema.Types.ObjectId, ref: 'topics'},
	labelId: {type: Schema.Types.ObjectId, ref: 'labels'},
	flags: {type:Number, default: 0},
	isLive: {type: Boolean, default: true}
});

Post.virtual('isVote').get(function() {
	return this.userVote;
});

Post.virtual('isVote').set(function(vote) {
	this.userVote = vote;
});

Post.set('toObject', {
	getters: true,
	virtuals: true,
});

Post.set('toJSON', {
	getters: true,
	virtuals: true,
});

module.exports = mongoose.model('posts', Post);