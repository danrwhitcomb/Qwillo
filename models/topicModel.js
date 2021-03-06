var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Topic = new Schema({
	title: {type: String, unique: true},
	titleLower: {type: String, unique: true},
	description: String,
	creationDate: {type: Date, default: Date.now },
	labels: [{type: Schema.Types.ObjectId, ref: 'labels'}],
	numberOfPosts: Number,
	imageUrl: String,
	isLocked: {type: Boolean, default: false},
	isLive: {type: Boolean, default: true}
});

module.exports = mongoose.model('topics', Topic);
