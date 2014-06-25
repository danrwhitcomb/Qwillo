var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Category = new Schema({
	title: String,
	description: String
});

module.exports = mongoose.model('Category', Category);