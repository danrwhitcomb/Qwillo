var topicService = require('../services/topicService');
var utils = require('../system/utils');

module.exports.getTopic = function(req, res){
	res.send('This is the topics page');
};

module.exports.getTopicsForCategory = function(req, res){
	if(req.body.category == null){
		utils.sendError(res, defines.messages.invalidData);
	} else {
		topicService.getTopicsForCategory(req.body.category, res);
	}
};