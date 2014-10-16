var topicService = require('../services/topicService');
var utils = require('../system/utils');
var defines = require('../system/defines');
var topicModel = require('../models/topicModel');

var Topic = topicModel;

module.exports.getTopic = function(req, res){
	var topic = req.params.id.toLowerCase();
	Topic.findOne({title: {$regex: new RegExp(topic, "i")}}, 
		function(err, topic){
			if(err){
				res.status(404);
			    res.render('404', { url: req.url });
			 
			} else {
				res.model = req.model;
				topicService.getTopicPage(res, topic);
			}
		});
};

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