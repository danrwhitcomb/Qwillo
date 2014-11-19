var defines = require('../system/defines');
var async = require('async');
var mongoose = require('mongoose');
var topicModel = require('../models/topicModel');
var postModel = require('../models/postModel');
var utils = require('../system/utils');

//Models 
var Topic = topicModel;
var Post = postModel;

module.exports.getTopicsForCategory = function(category, res){
	Topic.findAll();
};

module.exports.getTopicsForQuery = function(query, res){
	Topic.find({title: {$regex: query, $options: 'i'}},
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

module.exports.getTopicPage = function(res, topic){
	Post.find({topic: topic.title},
		function(err, posts){
			if(err){
				res.sendErr(err);
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

				var topPosts = posts.slice();
				topPosts.sort(function(a, b){
					var a_total = a.upvotes - a.downvotes;
					var b_total = b.upvotes - b.downvotes;

					if(a_total > b_total) return 1;
					if(a_total === b_total) return 0;
					else return -1;
				});

				var newPosts = posts.slice();
				newPosts.sort(function(a,b){
					if(a.datePosted < b.datePosted) return 1;
					if(a.datePosted === b.datePosted) return 0;
					else return -1;
				});

				// /* Calculate hot posts */
				// var hotPosts = posts.sort()
				// async.sortBy(posts, function(post, callback){
				// 	var time = (new Date(post.creationDate)).getTime() - Date.now;
				// 	var score = post.upvotes - post.downvotes;
				// 	var sign;
				// 	if(score > 0) sign = 1;
				// 	else if(sign < 0) sign = -1;
				// 	else sign = 0;
				// 	var order = Math.log(Math.max(Math.abs(score)))

				// 	return Math.round(order + sign * time / 45000);
				// }, function(err, results){
				// 	if(err){ utils.sendErr(res, err);}
				// 	else{
				// 		hotPosts = results;
				// 	}
				// });

				// var topPosts; 
				// async.sortBy(posts, function(post, callback){
				// 	return post.upvotes - post.downvotes;
				// }, function(err, results){
				// 	if(err){ utils.sendErr(res, err);}
				// 	else{
				// 		topPosts = results;
				// 	}
				// });

				// var newPosts; 
				// async.sortBy(posts, function(post, callback){
				// 	return (new Date(post.creationDate)).getTime() - Date.now;
				// }, function(err, results){
				// 	if(err){ utils.sendErr(res, err);}
				// 	else{
				// 		newPosts = results;
				// 	}
				// });

				

				var viewModel = {
					title: topic.title,
					hotPosts: hotPosts,
					topPosts: topPosts,
					newPosts: newPosts,
					imageUrl: topic.imageUrl,
					description: topic.description,
					creationDate: topic.creationDate,
					base: res.model
				}


				res.render('topics/topic', viewModel);
			}
		}).sort({datePosted: 'asc'}).limit(15);
}