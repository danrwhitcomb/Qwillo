var baseViewModel = require('./baseViewModel');

module.exports.model = function(){
	return new model();
};

function model(){
		this.base = null;
		this.results = [];
		this.resultsCount = 0;
		this.query = 0;
}