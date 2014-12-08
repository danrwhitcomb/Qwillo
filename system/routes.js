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

	router.post('/topic/submit', utils.isLoggedIn(), topicController.submitTopic);
	router.post('/topic/image', utils.isLoggedIn(), topicController.setPictureForTopic);
	router.get('/topic/:title/posts', topicController.getPostsForTopic);
	router.get('/topic/:title/posts/:postId', postController.getPost);
	router.get('/topic/:title', topicController.getTopic);
	router.post('/post/submit', utils.isLoggedIn(), postController.submitPost);
	router.get('/user/:username', utils.isLoggedIn(), accountController.getUser);
	router.post('/account/login', utils.isNotLoggedIn(), accountController.login);
	router.post('/account/logout', utils.isLoggedIn(), accountController.logout);
	router.post('/account/signup', utils.isNotLoggedIn(), accountController.doSignup); 


	app.use(subdomain('api', router));

	//HTML Routes
	app.route('/')
		.get(indexController.index);
	
	//Search routes
	app.route('/search')
		.get(searchController.doSearch);
	
	//app.route('/search/:query/')

	app.route('/topic/query/:query')
		.get(topicController.getTopicsForQuery);
	
	//Topic routes
	app.route('/topic/submit')
		.get(topicController.topicSubmissionPage)
		
	app.route('/topic/:id/:postName')
		.get(postController.getPostPage);
	
	app.route('/topic/:id')
		.get(topicController.getTopicPage);
		
	//Post routes
	

	//Submit Routes
	app.route('/post/submit')
		.get(postController.submissionPage)

	
	//Account routes
	app.route('/user/:user')
		.get(accountController.getUserProfilePage);
	app.route('/user/:user/settings')
		.get(accountController.getUserSettingsPage);
	
	app.route('/account/login')
		.get(accountController.loginPage);
	
	app.route('/account/signup')
		.get(accountController.signupPage);
	// //Dashboard routes !! ALL THESE ROUTES REQUIRE ADMIN ACCESS !!
	// app.route('/dashboard')
	// 	.get(utils.isAdmin(), dashboardController.index);

	// app.route('/dashboard/users')
	// 	.get(utils.isAdmin(), dashboardController.usersPage);

	// app.route('/dashboard/topics')
	// 	.get(utils.isAdmin(), dashboardController.topicsPage);

	// app.route('/dashboard/featured')
	// 	.get(utils.isAdmin(), dashboardController.featuredPage);

	// app.route('/dashboard/posts')
	// 	.get(utils.isAdmin(), dashboardController.postsPage);

	


	

	app.route('*')
	.get(function(req, res){
	  res.render('common/404', {base: req.model});
	});
};
