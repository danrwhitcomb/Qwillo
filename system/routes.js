//Controllers
var indexController = require('../controllers/indexController');
var categoryController = require('../controllers/categoryController');
var postController = require('../controllers/postController');
var topicController = require('../controllers/topicController');
var accountController = require('../controllers/accountController');
var searchController = require('../controllers/searchController');

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
	
	//Topic routes
	app.route('/topic/:id')
		.get(topicController.getTopic);
		
	//Post routes
	app.route('/post/:id')
		.get(postController.getPost);
	
	//Account routes
	app.route('/account/settings')
	.get(accountController.getUserSettings);
	
	app.route('/register')
	.get(accountController.registerUser)
	.post(accountController.doSignup);
};