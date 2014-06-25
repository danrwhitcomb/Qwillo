//Controllers
var indexController = require('../controllers/indexController');
var categoryController = require('../controllers/categoryController');
var postController = require('../controllers/postController');
var topicController = require('../controllers/topicController');
var accountController = require('../controllers/accountController');

module.exports.defineRoutes = function(app){
	
	//General routes
	app.route('/')
		.get(indexController.index);
	
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
	app.route('/account/:username')
		.get(accountController.getUserProfile);
	
	app.route('/account/:userId/settings')
		.get(accountController.getUserSettings);
};