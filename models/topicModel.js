var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Topic = new Schema({
	title: String,
	category: String,
	description: String,
	creationDate: { type: Date, default: Date.now },
	numberOfPosts: Number
});

module.exports = mongoose.model('topics', Topic);
