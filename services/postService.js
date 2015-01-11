var postModel = require('../models/postModel');
var topicModel = require('../models/topicModel');
var defines = require('../system/defines');
var utils = require('../system/utils');
var async = require('async');

var Post = postModel;
var Topic = topicModel;

module.exports.submitPostForUser = function(res, data, userId){

	var now = Date.now();
	var post = new Post({title: data.title, 
						 link: data.link,
						 description: data.description,
						 datePosted: now,
						 userId: userId,
						 topicId: data.topicId
						});


	//Check topic exists
	async.waterfall([
		function(callback){
			Topic.findOne({'_id': data.topicId}, function(err, topic){
				if(err) callback(err);
				else callback(null, post);
			})
		},
		savePost,
		function(callback){
			utils.sendSuccess(res, post);
		}
	], function(err){
		res.send({status: defines.messages.serverErrorCode,
				  message: defines.messages.serverError,
				  error: err})
	});
};


function savePost(post, callback){
	post.save(function(err){
		if(err) callback(err);
		else callback(null)
	});
};

module.exports.sendPostModel = function(){

}

