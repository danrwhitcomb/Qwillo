var defines = require('../system/defines');
var Category = require('../models/categoryModel');
var Topic = require('../models/topicModel');
var async = require('async');

module.exports.index = function(req, res){
	res.render('dashboard/featured', null);
}

module.exports.usersPage = function(req, res){

};


module.exports.topicsPage = function(req, res){
	res.render('dashboard/topic', null);
};

module.exports.featuredPage = function(req, res){
	module.exports.index(req, res);
};

module.exports.postsPage = function(req, res){

};

module.exports.getFeaturedTopics = function(req, res){
	Category.find().populate('featuredTopics').select('title featuredTopics')
	.exec(function(err, data){
		if(err) res.send({status:defines.messages.serverErrorCode, message: defines.messages.serverError});
		else {
			res.send({status:defines.messages.successCode, message: defines.messages.success, data: data});
		}
	});
}

module.exports.setFeaturedTopic = function(req, res){
	var cat = req.body.category;
	Category.find({titleLower: cat.toLowerCase()}).limit(1).exec(function(err, data){
		if(err) res.send({status:defines.messages.serverErrorCode, message: defines.messages.serverError});
		else if(!data[0]) res.send({status:defines.messages.dataNotFoundErrorCode, message: defines.messages.dataNotFound});
		else if(data[0].featuredTopics.length >= 4){
			res.send({status:600, message:"There are already 4 featured topics"});
		} else {
			Topic.find({titleLower: req.body.topic.toLowerCase()}).select('_id').limit(1).exec(function(err,topic){
				if(topic[0]){
					data[0].featuredTopics.push(topic[0]);
					data[0].save(function(err, cat){
						if(err) res.send({status:defines.messages.serverErrorCode, message: defines.messages.serverError});
						else res.send({status:defines.messages.successCode, message: defines.messages.successCode});
					});
				} else {
					res.send({status:defines.messages.dataNotFoundErrorCode, message: defines.messages.dataNotFound});
				}
				
			});
		}
	})
};

module.exports.deleteFeaturedTopic = function(req, res){
	var cat = req.body.category;
	var topic = req.body.topic;

	Category.find({titleLower: cat.toLowerCase()}).limit(1).exec(function(err, data){
		if(err || !data[0]) res.send({status:defines.messages.serverErrorCode, message: defines.messages.serverError});
		else {
			var index;
			for(var i = 0; i < data[0].featuredTopics.length; i++){
				if(data[0].featuredTopics[i].title.toLowerCase() == topic.toLowerCase()){
					index = i;
				}
			}

			if(index == null) res.send({status:defines.messages.serverErrorCode, message: defines.messages.serverError});
			else {
				data[0].featuredTopics.splice(index, 1);
				data[0].save(function(err, cat){
						if(err) res.send({status:defines.messages.serverErrorCode, message: defines.messages.serverError});
						else res.send({status:defines.messages.successCode, message: defines.messages.successCode});
					});
			}
		}
	});
}

module.exports.getAdminTopicData = function(req, res){
	
}

module.exports.saveAdminTopicData = function(req, res){

};

