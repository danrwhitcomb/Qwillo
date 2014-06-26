var baseViewModel = require('./baseViewModel');

module.exports.indexModel = function(){
	this.base = baseViewModel.model;
	this.title = null;
};