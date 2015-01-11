var postService = require('../services/postService');
var defines = require('../system/defines');
var postModel = require('../models/postModel');
var Post = postModel;
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
		if(err || post.length === 1){
			res.send({status: defines.messages.dataNotFoundErrorCode,
					  messages: defines.messages.dataNotFound});
		} else {
			res.send({status:  defines.messages.successCode, 
					  message: defines.messages.success,
					  data:    post[0]});
		}
	}).limit(1);
}

module.exports.getPostPage = function(req, res){
	//res.render("/post/postContent");
}
