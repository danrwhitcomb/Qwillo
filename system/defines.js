/*
defines.js
Defines constants for application
Aka strings, magic numbers, etc
*/

module.exports.appName = "Qwillo";

module.exports.categories = [
		'Art',
		'Science',
		'Music',
		'Games',
		'Computing',
		'History',
		'Social Sciences',
		'Literature',
		'News',
		'Sports',
		'TV & Film',
		'Business',
		'Fashion',
		'Other'
];

module.exports.messages = {
		success: "Successfully completed the action",
		successCode: 100,
		accountErrorCode: 200,
		invalidDataErrorCode: 300,
		dataNotFoundErrorCode: 400,
		serverErrorCode: 500,
		serverError: "A server error occured. Please try again in a few minutes!",
		notLoggedIn: "Oops! You must be logged in to perform this action.",
		loggingIn: "Oops! You can't perform this action while logged in.",
		invalidData: "Invalid argument error. Please use the correct argument.",
		invalidCredentials: "The credentials you provided does not match our records!",
		dataNotFound: "The data you requested could not be found!"
};

module.exports.stormpath = {
		appAddress: "https://api.stormpath.com/v1/applications/57eR7cPcXVv7PjQgdcgmqr"
};

module.exports.topics = {
	homepageTopics: [
		'Wikipedia',
		'Lycos',
		'History of Scotland',
		'Dwayne Johnson',
		'Nanoscopic Scale',
		'404 error'
	],

	featuredTopic:"Malware"
};

module.exports.decodeDatabaseError = function(error){
	return error.err;
}