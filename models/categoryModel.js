var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Category = new Schema({
	title: String,
	titleLower: String,
	link: String,
	description: String,
	featuredTopics: [{type: Schema.Types.ObjectId, ref: 'topics'}]
});

module.exports = mongoose.model('categories', Category);