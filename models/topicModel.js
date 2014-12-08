var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Topic = new Schema({
	title: String,
	titleLower: String,
	description: String,
	creationDate: { type: Date, default: Date.now },
	labels: [],
	numberOfPosts: Number,
	imageUrl: String,
});

module.exports = mongoose.model('topics', Topic);
