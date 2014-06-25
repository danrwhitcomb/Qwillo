var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Topic = new Schema({
	title: String,
	description: String,
	creationDate: Date,
	numberOfPosts: Integer
});

module.exports = mongoose.model('Topic', Topic);