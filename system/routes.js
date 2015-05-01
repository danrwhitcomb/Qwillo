//Controllers
var indexController = require('../controllers/indexController');
var postController = require('../controllers/postController');
var topicController = require('../controllers/topicController');
var accountController = require('../controllers/accountController');
var searchController = require('../controllers/searchController');
var dashboardController = require('../controllers/dashboardController');
var utils = require('../system/utils');

var userModel = require('../models/userModel');
var User = userModel;
var express = require('express');

module.exports.defineRoutes = function(app, subdomain){
	
	//API ROUTES
	var router = express.Router();

	router.get('/', function(req, res) {
	    res.send('Welcome to our API!');
	});



	//HTML Routes
	app.route('/')
		.get(indexController.index);
	
	//Search routes
	app.route('/search')
		.get(searchController.doSearch);
	
	//app.route('/search/:query/')

	app.route('/topic/query/:query')
		.get(topicController.getTopicsForQuery);
	

	app.route('/topic')
		.get(topicController.getTopicPage);

	//Topic routes
	app.route('/topic/submit')
		.post(utils.isLoggedIn(), topicController.submitTopic);

	app.route('/topic/image')
		.post(utils.isLoggedIn(), topicController.setPictureForTopic);

	app.route('/topic/adminSave')
		.post(utils.isAdmin(), dashboardController.saveAdminTopicData);
	app.route('/topic/save')
		.post(utils.isLoggedIn(), topicController.saveTopicData);
	
	app.route('/topic/:title/data')
		.get(topicController.getTopic);

	app.route('/topic/:title')
		.get(topicController.getTopicPage);

	app.route('/topic/:title/labels')
		.get(topicController.getTopicLabels);

	app.route('/topics/labels/createrequest')
		.post(utils.isLoggedIn(), topicController.createLabelRequest);

	app.route('/topic/:id/posts/:type')
		.get(topicController.getPostsForTopic);

	app.route('/topic/:title/posts/:postName')
		.get(postController.getPostForTopic);
		
	//Post routes
	

	//Submit Routes
	app.route('/post/submit')
		.get(postController.submissionPage)
		.post(utils.isLoggedIn(), postController.submitPost);

	app.route('/post/upvote')
		.post(utils.isLoggedIn(), postController.updateUpvote);

	app.route('/post/downvote')
		.post(utils.isLoggedIn(), postController.updateDownvote);

	

	app.route('/post')
		.get(postController.getPostPage);

	//Account routes
	app.route('/user/:user')
		.get(accountController.getUserProfilePage);
	app.route('/user/:user/settings')
		.get(accountController.getUserSettingsPage);
	

	app.route('/pages/account/handler')
		.get(accountController.accountHandlerPage);

	app.route('/account/login')
		.get(accountController.loginPage)
		.post(accountController.login);
	
	app.route('/account/signup')
		.get(accountController.signupPage)
		.post(accountController.doSignup);

	app.route('/account/logout')
		.post(accountController.logout);

	// //Dashboard routes !! ALL THESE ROUTES REQUIRE ADMIN ACCESS !!
	app.route('/dashboard')
		.get(utils.isAdmin(), dashboardController.index);

	app.route('/dashboard/users')
		.get(utils.isAdmin(), dashboardController.usersPage);

	app.route('/dashboard/topics')
		.get(utils.isAdmin(), dashboardController.topicsPage);

	app.route('/dashboard/posts')
		.get(utils.isAdmin(), dashboardController.postsPage);

	


	

	app.route('*')
	.get(function(req, res){
	  res.render('common/404', {base: req.model});
	});
};
