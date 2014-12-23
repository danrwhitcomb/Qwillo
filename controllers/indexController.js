
/*
 * GET home page.
 */
var viewModels = require('./viewModels/indexViewModel');
var defines = require('../system/defines');
var topicService = require('../services/topicService');
var Category = require('../models/categoryModel');

module.exports.index = function(req, res){

	var model = viewModels.indexModel();
	model.base = req.model;
	model.title = defines.appName + " | Home";

	var query = Category.find().select('title').sort({title:1}).exec(function(err, data){
		if(err) res.send({status:defines.messages.serverErrorCode, message: defines.messages.serverError});
		else{
			model.categories = data
			res.render('index/index', model);
		}
	});

};

module.exports.indexCategories = function(req, res){
	var model = {base: req.model};

	Category.find().sort({title:1}).exec(function(err, data){
		if(err) res.send({status:defines.messages.serverErrorCode, message: defines.messages.serverError});
		else{
			model.categories = data
			res.render('index/categories', model);
		}
	});
};

module.exports.skeletonPage = function(req, res){
	res.render('common/skeleton');
}

module.exports.sidebarPage = function(req, res){
	var model = {base: req.model};

	Category.find().sort({title:1}).exec(function(err, data){
		if(err) res.send({status:defines.messages.serverErrorCode, message: defines.messages.serverError});
		else{
			model.categories = data
			res.render('index/sidebar', model);
		}
	});
}