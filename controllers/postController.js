var postService = require('../services/postService');
var defines = require('../system/defines');
var postModel = require('../models/postModel');
var User = require('../models/userModel');
var async = require('async');
var Post = postModel;
var mongoose = require('mongoose');
var Schema = mongoose.schema;
var utils = require('../system/utils');


module.exports.getPost = function(req, res) {
	res.send('This is the post page');
};

//DEPRECATED
module.exports.submissionPage = function(req, res) {
	res.render('posts/submit', {base:req.model});
};

module.exports.submitPost = function(req, res){
	postService.submitPostForUser(res, req.body, req.session.userId);

};

module.exports.deletePost = function(req, res) {

};

module.exports.getPostForTopic = function(req, res) {
	Post.find({_id: req.params.postName, topic: req.params.title.toLowerCase()}, function(err, post){
		if(err || post.length !== 1){
			utils.sendErr(res, defines.response.codes.dataNotFoundError, defines.response.messages.dataNotFoundError);
		} else {
			utils.sendSuccess(res, post[0]);
		}
	}).limit(1);
}

module.exports.getPostPage = function(req, res) {
	//res.render("/post/postContent");
}

module.exports.updateUpvote = function(req, res) {
	if(req.body.post == null) utils.sendErr(res, defines.response.codes.invalidData, defines.response.messages.invalidData);
	else{
		async.waterfall([
			function(callback){
				Post.findById(req.body.post, function(err, post) {
					if(err || !post) callback(err, [defines.messages.serverErrorCode, defines.messages.serverError]);
					else{
						callback(null, post);
					}
				});
			},

			function(post, callback) {

				User.findOne({_id: req.model.user.id, 'voteHistory.post': post.id},{'voteHistory.$': 1},
                    function(err, vote) {
                        if(err) callback(err, [defines.messages.serverErrorCode, defines.messages.serverError]);
                        else {
                            if(vote && vote.voteHistory[0]){
                                vote = vote.voteHistory[0];
                            } else {
                                vote =null;
                            }
                            callback(null, post, vote);
                        }
                    }
                );
			},

			function(post, vote, callback) {

				if(vote == null){
					post.upvote++;
					var newVote = {post: post.id, vote: true, date: Date.now()};
					req.model.user.voteHistory.push(newVote);
				} else {

					if(vote.vote){
						post.upvote--;
                        User.update({_id: req.model.user.id}, {
                            $pull: {'voteHistory': {'post': post.id}}
                        }, function(err){});
					} else {
						post.upvote++;
						post.downvote--;
						User.update({_id: req.model.user.id, "voteHistory.post": post.id}, {
							$set: {"voteHistory.$.vote": true, "voteHistory.$.date": Date.now()}
						}, function(err){});
						//vote.vote = true;
						//vote.date = Date.now();
					}
				}

				req.model.user.save(function(err){
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
};

module.exports.updateDownvote = function(req, res){
	if(req.body.post == null) utils.sendErr(res, defines.response.codes.invalidData, defines.response.messages.invalidData);
	else{
		async.waterfall([
				function(callback){
					Post.findById(req.body.post, function(err, post) {
						if(err || !post) callback(err, [defines.messages.serverErrorCode, defines.messages.serverError]);
						else{
							callback(null, post);
						}
					});
				},

				function(post, callback) {

                    User.findOne({_id: req.model.user.id, 'voteHistory.post': post.id},{'voteHistory.$': 1},
                        function(err, vote) {
                            if(err) callback(err, [defines.messages.serverErrorCode, defines.messages.serverError]);
                            else {
                                if(vote && vote.voteHistory[0]){
                                    vote = vote.voteHistory[0];
                                } else {
                                    vote =null;
                                }
                                callback(null, post, vote);
                            }
                        }
                    );
				},

				function(post, vote, callback) {

					if(vote == null){
						post.downvote++;
						var newVote = {post: post.id, vote: false, date: Date.now()};
						req.model.user.voteHistory.push(newVote);
					} else {

						if(!vote.vote){
							post.downvote--;
							User.update({_id: req.model.user.id}, {
								$pull: {'voteHistory': {'post': post.id}}
							}, function(err){});
						} else {
							post.upvote--;
							post.downvote++;
                            User.update({_id: req.model.user.id, "voteHistory.post": post.id}, {
                                $set: {"voteHistory.$.vote": false, "voteHistory.$.date": Date.now()}
                            }, function(err){});
						}
					}

					req.model.user.save(function(err){
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

