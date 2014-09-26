var defines = require('../system/defines');
var async = require('async');
var mongoose = require('mongoose');
var topicModel = require('../models/topicModel');
var postModel = require('../models/postModel');

//Models 
var Topic = topicModel;
var Post = postModel;

module.exports.getTopicsForCategory = function(category, res){
	Topic.findAll();
}

module.exports.getHomepageTopics = function(model, res){
	var definedTopics = defines.topics.homepageTopics;

	async.parallel([
		function(callback){
			Topic.find({title: {$in: definedTopics}},
				function(err, docs){
					if(err) callback(err, docs);
					else {
						model.topics = docs;
						callback(null, docs);
					}
				});
		},
		function(callback){
			Topic.findOne({title: defines.topics.featuredTopic}, 
				function(err, topic){
					if(err) callback(err, topic);
					else{
						model.featuredTopic = topic;
						Post.find({topic: topic}, function(err, posts){
							if(err) callback(err);
							else {
								model.featuredPosts = posts.sort({upvotes: -1});
								callback(null, topic);
							}
						}).limit(5);
					}
				});
		}
	],
		function(err, results){
			if(err){
				utils.sendError(res, err);
			} else {
				res.render('index', model);
			}
		});
	
}