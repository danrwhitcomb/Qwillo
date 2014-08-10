var defines = require('./defines');

module.exports.sendSuccess = function(res){
	res.send({status: defines.messages.successCode});
};

module.exports.sendErr = function(res, err){
	res.send({status: err});
};