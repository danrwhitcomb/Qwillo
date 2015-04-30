var defines = require('../system/defines');
var async = require('async');
var mongoose = require('mongoose');
var topicModel = require('../models/topicModel');
var postModel = require('../models/postModel');
var User = require('../models/userModel');
var utils = require('../system/utils');

//Models 
var Topic = topicModel;
var Post = postModel;

module.exports.getTopicsForCategory = function(category, res){
	Topic.findAll();
};

module.exports.createNewTopic = function(res, topic, description, imageUrl){
	Topic.findOne({titleLower: topic.toLowerCase()},
	function(err, topicObj){
		if(err) {
			utils.sendErr(res, err);
		} else if(topicObj){
			utils.sendErr(res, "Topic already exists");
		} else {
			var newTopic = new Topic({
				title: topic,
				titleLower: topic.toLowerCase(),
				description: description,
				creationDate: { type: Date, default: Date.now },
				numberOfPosts: 0,
				imageUrl: imageUrl,
			});
			newTopic.save(function(err){
				if(err) callback(err);
				else utils.sendSuccess(res);
			});
		}
	});
}

module.exports.getTopicsForQuery = function(query, res){
	query.replace('\(', '\(');
	query.replace('\)', '\)');
	Topic.find({title: {$regex: new RegExp(query, "i")}},
		function(err, topics){
			if(err) {
				utils.sendErr(res, err);
			} else {
				res.send(topics);
			}
		}).limit(15);
};

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
				utils.sendErr(res, err);
			} else {
				res.render('index', model);
			}
		});
	
};

module.exports.getHotPostsForTopic = function(res, req, topic, start, limit){
	start = start || 0;
	limit = limit || 15;
	Post.find({topicId: topic},
		function(err, posts){
			if(err){
				res.send({status: defines.messages.serverErrorCode, message: defines.message.serverError});
			} else {

				var hotPosts = posts.slice();
				hotPosts.sort(function(a, b){
					var a_time = (new Date(a.datePosted)).getTime() - Date.now;
					var a_score = a.upvotes - a.downvotes;
					var a_sign;
					if(a_score > 0) a_sign = 1;
					else if(a_sign < 0) a_sign = -1;
					else a_sign = 0;
					var a_order = Math.log(Math.max(Math.abs(a_score)));
					var a_total = Math.round(a_order + a_sign * a_time / 45000);

					var b_time = (new Date(a.datePosted)).getTime() - Date.now;
					var b_score = a.upvotes - a.downvotes;
					var b_sign;
					if(b_score > 0) b_sign = 1;
					else if(b_sign < 0) b_sign = -1;
					else b_sign = 0;
					var b_order = Math.log(Math.max(Math.abs(b_score)));
					var b_total = Math.round(b_order + b_sign * b_time / 45000);

					if(a_total > b_total) return 1;
					if(a_total === b_total) return 0;
					else return -1;
				});

				if(req.session.user){
					if(!addUserVotes(res, req.session.user.id, hotPosts)) return;
				}


				utils.sendSuccess(res, hotPosts);
			}
		}).sort({datePosted: 'asc'}).skip(start).limit(limit);
}

module.exports.getNewPostsForTopic = function(res, req, topic, start, limit){
	start = start || 0;
	limit = limit || 15;
	Post.find({topicId: topic},
		function(err, posts){
			if(err){
				res.send({status: defines.messages.serverErrorCode, message: defines.message.serverError});
			} else {

				if(req.session.user){
					if(!addUserVotes(res, req.session.user.id, posts)) return;
				}

				utils.sendSuccess(res, posts);
			}

		}).sort({datePosted: 'asc'}).skip(start).limit(limit);
}

module.exports.getTopPostsForTopic = function(res, req, topic, start, limit){
	start = start || 0;
	limit = limit || 15;
	Post.find({topicId: topic},
		function(err, posts){
			if(err){
				res.send({status: defines.messages.serverErrorCode, message: defines.message.serverError});
			} else {

				var topPosts = posts.slice();
				topPosts.sort(function(a, b){
					var a_score = a.upvote - a.downvote;
					var b_score = b.upvote - b.downvote;

					if(a_score > b_score) return 1;
					if(a_score == b_score) return 0;
					else return -1;
				});

				if(req.session.user){
					addUserVotes(res, req.session.user.id, topPosts);
				} else {
					utils.sendSuccess(res, topPosts);
				}
			}
		}).sort({datePosted: 'asc'}).skip(start).limit(limit);
}

function addUserVotes(res, userId, posts){
	console.log(userId);
	User.findById(userId, function(err, user){
		if(err || user == null){
			utils.sendErr(res, defines.response.codes.serverError, defines.response.codes.serverError);
		} else {

			for(i in user.voteHistory.toObject()){
				var vote = user.voteHistory[i];
				for(j in posts){
					var post = posts[j];

					if(post.id == vote.post){
						var val = vote.vote ? 1 : -1;
						post.set('isVote', val);
					} else {
						post.set('isVote', 0);
					}
				}
			}
			utils.sendSuccess(res, posts);
		}
	});
}

module.exports.setPictureForTopic = function(res, topic, imageUrl){
	Topic.findOne({titleLower: topic.toLowerCase()},
		function(err, topicObj){
			if(err || !topicObj) {
				utils.sendErr(res, err);
			} else {
				topicObj.imageUrl = imageUrl;
				topicObj.save(function(err, project, numAffected){
					if(err) utils.sendErr(res, err);
					else utils.sendSuccess(res);
				});
			}
		});
}