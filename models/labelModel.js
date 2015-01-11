var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Label = new Schema({
	name: String,
	nameLower: String,
	topic: {type: Schema.Types.ObjectId, ref: 'topics'}
});

module.exports = mongoose.model('labels', Label);