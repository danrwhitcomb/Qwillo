var topicService = require('../services/topicService');
var utils = require('../system/utils');
var defines = require('../system/defines');
var topicModel = require('../models/topicModel');

var Topic = topicModel;

module.exports.getTopic = function(req, res){
	var topic = req.params.title.toLowerCase();
	Topic.findOne({titleLower: topic}, 
		function(err, topic){
			if(err || !topic){
				res.send({status:  defines.messages.dataNotFoundErrorCode,
						  message: defines.messages.dataNotFound});
			 
			} else {
				utils.sendSuccess(res, topic);
			}
		});
};

module.exports.getPostsForTopic = function(req, res){
	var topic = req.params.title.toLowerCase();
	Topic.findOne({titleLower: topic}, 
		function(err, topic){
			if(err || !topic){
				res.send({status:  defines.messages.dataNotFoundErrorCode,
						  message: defines.messages.dataNotFound});
			 
			} else {
				topicService.getPostsForTopic(res, req.params.topic, req.query.start, req.query.limit);
			}
		});
	
}

module.exports.getTopicPage = function(req, res){
	res.render('topic/topicPage');
}


module.exports.topicSubmissionPage = function(req, res){
	res.render('topics/topic_submit');
}

module.exports.submitTopic = function(req, res){
	if(!req.session.user){
		res.send({status:  defines.messages.accountErrorCode,
				  message: defines.messages.notLoggedIn});
	} else if(!req.body.topic || !req.body.description) {
		res.send({status:  defines.messages.invalidDataErrorCode, 
				  message: defines.messages.invalidData});
	} else {
		var imageUrl = req.body.imageUrl ? req.body.imageUrl:'';
		topicService.createNewTopic(res, req.body.topic, req.body.description, imageUrl);
	}
}

module.exports.getTopicsForCategory = function(req, res){
	if(req.body.category == null){
		utils.sendErr(res, defines.messages.invalidData);
	} else {
		topicService.getTopicsForCategory(req.body.category, res);
	}
};

module.exports.getTopicsForQuery = function(req, res){
	if(req.params.query == null){
		utils.sendErr(res, defines.messages.invalidData);
	} else {
		topicService.getTopicsForQuery(req.params.query, res);
	}
};

module.exports.setPictureForTopic = function(req, res){
	if(!req.session.user){
		utils.sendErr(res, defines.messages.notLoggedIn);
	} else if(!req.body.topic || !req.body.imageUrl){
		utils.sendErr(res, defines.messages.invalidData);
	} else {
		topicService.setPictureForTopic(res, req.body.topic, req.body.imageUrl);
	}
}