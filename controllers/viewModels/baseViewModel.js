/*
This is the base model for all views
The information for this model is for all 
nav bar functions primarily
*/
var defines = require('../../system/defines');

module.exports.model = function(){
	return new baseModel();
};

function baseModel(){
	this.username = null;
	this.categories = defines.categories
	this.title = defines.appTitle;
}
