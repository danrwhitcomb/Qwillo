//Controllers
var indexController = require('../controllers/indexController');
var categoryController = require('../controllers/categoryController');
var postController = require('../controllers/postController');
var topicController = require('../controllers/topicController');
var accountController = require('../controllers/accountController');
var searchController = require('../controllers/searchController');
var dashboardController = require('../controllers/dashboardController');

var userModel = require('../models/userModel');
var User = userModel;

module.exports.defineRoutes = function(app){
	
	//General routes
	app.route('/')
		.get(indexController.index);
	
	//Search routes
	app.route('/search')
		.get(searchController.doSearch);
	
	//app.route('/search/:query/')
	
	//Category routes
	app.route('/category/:id')
		.get(categoryController.getCategory);

	app.route('/topic/query/:query')
		.get(topicController.getTopicsForQuery);
	
	//Topic routes
	app.route('/topic/submit')
		.get(topicController.topicSubmissionPage)
		.post(topicController.submitTopic);
		
	app.route('/topic/image')
		.post(topicController.setPictureForTopic);
		
	app.route('/topic/:id/:postName')
		.get(postController.getPost);
	
	app.route('/topic/:id')
		.get(topicController.getTopic);
		
	//Post routes
	

	//Submit Routes
	app.route('/post/submit')
		.get(postController.submissionPage)
		.post(postController.submitPost);

	
	//Account routes
	app.route('/user/:user')
		.get(accountController.getUserProfile);
	app.route('/user/:user/settings')
		.get(accountController.getUserSettings);
	
	app.route('/account/login')
		//.get(accountController.loginPage)
		.post(accountController.login);
	
	app.route('/account/logout')
		.post(accountController.logout);
	
	app.route('/register')
		.get(accountController.registerUser)
		.post(accountController.doSignup);


	app.route('/dashboard')
		.get(isAdmin(), dashboardController.index)

	app.route('*')
	.get(function(req, res){
	  res.render('common/404', {base: req.model});
	});
};

function isAdmin(){
	return function(req, res, next){
		User.findOne({usernameLower: req.session.user.username.toLowerCase()}, function(err, user){
			if(err || !user){
				res.sendStatus(403);
			} else {
				if(user.isAdmin){
					next();
				} else {
					res.sendStatus(403);
				}
			}
		});
	};
}