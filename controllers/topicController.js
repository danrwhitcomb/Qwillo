var topicService = require('../services/topicService');
var utils = require('../system/utils');
var defines = require('../system/defines');
var topicModel = require('../models/topicModel');

var Topic = topicModel;

module.exports.getTopic = function(req, res){
	var topic = req.params.id.toLowerCase();
	Topic.findOne({titleLower: topic}, 
		function(err, topic){
			if(err || !topic){
				res.status(404);
			    res.render('common/404', { base:req.model });
			 
			} else {
				res.model = req.model;
				topicService.getTopicPage(res, topic);
			}
		});
};

module.exports.topicSubmissionPage = function(req, res){
	res.render('topics/topic_submit', {base:req.model});
}

module.exports.submitTopic = function(req, res){
	if(!req.session.username){
		utils.sendErr(res, defines.messages.notLoggedIn);
	} else if(!req.body.topic || !req.body.description) {
		utils.sendErr(res, defines.messages.invalidData);
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
	if(!req.session.username){
		utils.sendErr(res, defines.messages.notLoggedIn);
	} else if(!req.body.topic || !req.body.imageUrl){
		utils.sendErr(res, defines.messages.invalidData);
	} else {
		topicService.setPictureForTopic(res, req.body.topic, req.body.imageUrl);
	}
}