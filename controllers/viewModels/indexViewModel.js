var baseViewModel = require('./baseViewModel');

module.exports.indexModel = function(){
	return new indexModel();
};

function indexModel(){
	this.base = null
	this.title = null;
}