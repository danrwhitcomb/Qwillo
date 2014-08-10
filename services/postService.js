var postModel = require('../models/postModel');
var defines = require('../system/defines');
var utils = require('../system/utils');
var async = require('async');

var Post = postModel.Post;
var Topic = topicModel.Topic;

module.exports.submitPostForUser = function(res, data, username){

	var now = new Data(year, month, day, hour, minute);
	var post = new Post({title: data.title, 
						 link: data.link,
						 description: data.description,
						 dataPosted: now,
						 user: username,
						 upvote: 0,
						 downvote: 0,
						 topic: data.topic
						});


	//Check topic exists
	async.waterfall([
		function(callback){
			Topic.findOne({'title': data.topic}, function(err, topic){
				if(err) callback(err);
				else callback(null, post);
			})
		},
		savePost,

		function(callback){
			utils.sendSuccess(res);
		}
	], function(err){
		utils.sendError(res, err);
	});
};

module.exports.getPostForId = function(res, id){

}

module.exports.savePost = function(post, callback){
	post.save(function(err){
		if(err) callback(err);
		else callback(null)
	});
};

module.exports.checkTopic(callback, topic) = function(err, topic){
	if(error){
		savePost = function()
	}
};

module.exports.sendPostModel = function(){

}

