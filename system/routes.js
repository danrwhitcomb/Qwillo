//Controllers
var indexController = require('../controllers/index');

module.exports.defineRoutes = function(app){
	
	app.route('/')
		.get(indexController.index);
}