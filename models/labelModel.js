var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Label = new Schema({
	name: String,
	nameLower: String,
	description : String,
	topic: {type: Schema.Types.ObjectId, ref: 'topics'},
	approvedBy: {type: Schema.Types.ObjectId, ref: 'users'},
	approvedDate : Date,
	isApproved : {type: Boolean, default: false },
	submittedBy : {type: Schema.Types.ObjectId, ref: 'users'}
});

module.exports = mongoose.model('labels', Label);