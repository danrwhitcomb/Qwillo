var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Post = new Schema({
	title: String,
	link: String,
	description: String,
	datePosted: Date,
	user: String,
	upvote: {type:Number, default: 0},
	downvote: {type:Number, default: 0},
	topic: String,
	labels: [{type: Schema.Types.ObjectId, ref: 'labels'}],
	flags: {type:Number, default: 0}
});

module.exports = mongoose.model('posts', Post);