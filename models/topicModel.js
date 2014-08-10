var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Topic = new Schema({
	title: String,
	description: String,
	creationDate: { type: Date, default: Date.now },
	numberOfPosts: Integer
});

module.exports = mongoose.model('Topic', Topic);