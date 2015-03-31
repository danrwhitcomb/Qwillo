var topicService = require('../services/topicService');
var utils = require('../system/utils');
var defines = require('../system/defines');
var Topic = require('../models/topicModel');
var Label = require('../models/labelModel');
var async = require('async')

module.exports.getTopic = function(req, res){
	var topic = req.params.title.toLowerCase();
	Topic.findOne({titleLower: topic}).select('title imageUrl description ').exec( 
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
	var topicId = req.params.id;
	Topic.findOne({'_id': topicId}, 
		function(err, topic){
			if(err || !topic){
				res.send({status:  defines.messages.dataNotFoundErrorCode,
						  message: defines.messages.dataNotFound});
			 
			} else {
				if(req.params.type == "hot")
					topicService.getHotPostsForTopic(res, req.params.id, req.query.start, req.query.limit);
				else if(req.params.type == "new")
					topicService.getNewPostsForTopic(res, req.params.id, req.query.start, req.query.limit);
				else
					topicService.getTopPostsForTopic(res, req.params.id, req.query.start, req.query.limit);
			}
		});
	
}

module.exports.getTopicPage = function(req, res){
	Topic.findOne({titleLower: req.params.title.toLowerCase()}).select('title imageUrl description _id labels').populate('labels').exec( 
		function(err, topic){
			if(err || !topic){
				res.status(404);
			 
			} else {
				res.render('topic/topic', {base: req.model, topic: topic});
			}
		});
}


module.exports.topicSubmissionPage = function(req, res){
	res.render('topic/submit', {base: req.model});
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

module.exports.topicSidebar = function(req, res){
	var topic = req.params.title;
	Topic.find({titleLower: topic.toLowerCase()}).limit(1).exec(function(err, data){
		if(err || !data[0]) res.send('');
		else res.render('topic/sidebar', {base: req.model, topic: data[0]});
	});
};

module.exports.topicContent = function(req, res){
	res.render('topic/content', {base: req.model});
};

module.exports.getTopicLabels = function(req, res){
	Label.find({topic: req.params.title.toLowerCase()}, function(err, data){
		if(err) res.send({status:defines.messages.serverErrorCode, message: defines.messages.serverError});
		else {
			res.send({status: defines.messages.successCode, message: defines.messages.success, data: data});
		}
	});
};

module.exports.createLabelRequest = function(req, res){
	if(req.body.name == null || req.body.topic == null){
		utils.sendErr(res, defines.messages.invalidDataErrorCode, defines.messages.invalidData);
	} else {
		var newLabel = new Label({name: req.body.name,
			nameLower: req.body.name.toLowerCase(),
			topic: req.body.topic,
			approvedBy: null,
			approvedDate: null,
			submittedBy: req.session.user.id}
		);

		if(req.body.description){
			newLabel.description = req.body.description;
		}

		async.waterfall([
			function(callback){
				newLabel.save(function(err, label){
					if(err || !label) 
						callback(err, [res, defines.messages.serverErrorCode, defines.messages.serverError]);
					else {
						callback(null, label);
					}

				});
			},

			function(label, callback){
				Topic.update({_id: label.topic}, {$push: {'labels': newLabel.id}},
					function(err, saved_topic){
					if(err)
						callback(err, [res, defines.messages.serverErrorCode, defines.messages.serverError]);
					else
						utils.sendSuccess(res);
				});
			}

			], 
			function(err, result){
				utils.sendErr(res, result[0], result[1]);
			}
		)

		

	}

	
}

module.exports.saveTopicData = function(req, res){

}