var postService = require('../services/postService');
var defines = require('../system/defines');
var postModel = require('../models/postModel');
var User = require('../models/userModel');
var async = require('async');
var Post = postModel;
var mongoose = require('mongoose');
var Schema = mongoose.schema;
var utils = require('../system/utils');


module.exports.getPost = function(req, res){
	res.send('This is the post page');
};

//DEPRECATED
module.exports.submissionPage = function(req, res){
	res.render('posts/submit', {base:req.model});
};

module.exports.submitPost = function(req, res){
	postService.submitPostForUser(res, req.body, req.session.userId);

};

module.exports.deletePost = function(req, res){

};

module.exports.getPostForTopic = function(req, res){
	Post.find({_id: req.params.postName, topic: req.params.title.toLowerCase()}, function(err, post){
		if(err || post.length !== 1){
			utils.sendErr(res, defines.response.codes.dataNotFoundError, defines.response.messages.dataNotFoundError);
		} else {
			utils.sendSuccess(res, post[0]);
		}
	}).limit(1);
}

module.exports.getPostPage = function(req, res){
	//res.render("/post/postContent");
}

module.exports.updateUpvote = function(req, res){
	if(req.body.post == null|| req.body.vote == null) utils.sendErr(res, defines.response.codes.invalidData, defines.response.messages.invalidData);
	else{
		async.waterfall([
			function(callback){
				Post.findById(req.body.post, function(err, post){
					if(err || !post) callback(err, [defines.messages.serverErrorCode, defines.messages.serverError]);
					else{
						callback(null, post);
					}
				});
			},

			function(post, callback){
				User.findById(req.session.user.id, function(err, user){
					if(err || !user) callback(err, [defines.messages.serverErrorCode, defines.messages.serverError]);
					else {
						callback(null, post, user);
					}
				});
			},

			function(post, user, callback){

				var hasBeenVoted = false;
				var userPost;
				utils.debugLog("Post: " + post);

				for(var hist in user.voteHistory.toObject()){
					utils.debugLog("Hist" + hist);
					
					if(hist.post == post.id){
						hasBeenVoted = true;
						if(hist.vote){
							callback(1, [defines.response.codes.duplicateDataError, defines.response.messages.duplicateDataError]);
							return;
						}
						userPost = hist;
						break;
					}
				}

				if(!hasBeenVoted){
					post.upvote++;
					var newVote = {post: post.id, vote: true, date: Date.now()};
					user.voteHistory.push(newVote);
				} else {

					if(!req.body.vote){
						post.upvote--;
						user.voteHistory.remove(hist);
					} else {
						post.upvote++;
						post.downvote--;
						userPost.vote = true;
						userPost.data = Date.now();
					}
				}

				user.save(function(err){
					if(err) callback(err, [defines.response.codes.serverError, defines.response.messages.serverError]);
					else callback(null, post);

				});
			}, 

			function(post, callback){
				post.save(function(err){
					if(err) callback(err, [defines.response.codes.serverError, defines.response.messages.serverError]);
					else utils.sendSuccess(res);
				});
			}

			], 
			function(err, result){
				utils.sendErr(res, result[0], result[1]);
			}
		);
	}
}

