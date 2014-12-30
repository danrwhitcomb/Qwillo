var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Label = new Schema({
	name: String,
	nameLower: String,
	topic: String
});

module.exports = mongoose.model('labels', Label);