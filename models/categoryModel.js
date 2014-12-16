var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Category = new Schema({
	title: String,
	link: String,
	description: String,
	featuredTopics: []
});

module.exports = mongoose.model('categories', Category);