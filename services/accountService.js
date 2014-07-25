var accountRepo = require('../repositories/accountRepository');
var defines = require('../system/defines');

module.exports.signupUser = function(params){
	if(accountRepo.isEmailTaken(params.email)){
		return {result: false, reason: defines.accountErrors.EmailTaken};
	}
	
	if(accountRepo.isUsernameTaken(params.username)){
		return {result: false,  reason: defines.accountErrors.UsernameTaken};
	}
	
	return accountRepo.addUser(params);
};

