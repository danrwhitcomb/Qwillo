
var postService = require('../services/postService');
var defines = require('../system/defines');
var postModel = require('../models/postModel');
var Post = 
module.exports.getPost = function(req, res){
	res.send('This is the post page');
};

module.exports.submissionPage = function(req, res){
	if(req.query.topic){
		res.render('posts/submit', {base: req.model, topic: req.query.topic});
	} else {
		res.render('posts/submit', {base:req.model});
	}
};

module.exports.submitPost = function(req, res){
	if(req.session.user == null){
		res.send({status: defines.messages.notLoggedIn});
	} else {
		postService.submitPostForUser(res, req.body, req.session.user);
	}
};

module.exports.deletePost = function(req, res){

};

module.exports.getPost = function(req, res){
	var id = req.query.linkId;
}
