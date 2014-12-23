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

	app.route('/pages/index/category')
		.get(indexController.indexCategories);

	app.route('/pages/index/skeleton')
		.get(indexController.skeletonPage);

	app.route('/pages/index/sidebar')
		.get(indexController.sidebarPage);
	
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
	
	app.route('/topic/:title/data')
		.get(topicController.getTopic);

	app.route('/topic/:title')
		.get(topicController.getTopicPage);

	app.route('/topic/:title/posts')
		.get(topicController.getPostsForTopic);

	app.route('/topic/:title/posts/:postName')
		.get(postController.getPostForTopic);

		//HTML
		app.route('/pages/topic/submit')
			.get(topicController.topicSubmissionPage)
		app.route('/pages/topic/sidebar/:title')
			.get(topicController.topicSidebar);
		app.route('/pages/topic/content/:title')
			.get(topicController.topicContent);
		
	//Post routes
	

	//Submit Routes
	app.route('/post/submit')
		.get(postController.submissionPage);

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

	app.route('/dashboard/featured')
		.get(utils.isAdmin(), dashboardController.featuredPage);
	app.route('/dashboard/featured/getTopics')
		.get(utils.isAdmin(), dashboardController.getFeaturedTopics);

	app.route('/dashboard/featured/setFeatured')
		.post(utils.isAdmin(), dashboardController.setFeaturedTopic);

	app.route('/dashboard/featured/removeFeatured')
		.post(utils.isAdmin(), dashboardController.deleteFeaturedTopic);

	app.route('/dashboard/posts')
		.get(utils.isAdmin(), dashboardController.postsPage);

	


	

	app.route('*')
	.get(function(req, res){
	  res.render('common/404', {base: req.model});
	});
};
