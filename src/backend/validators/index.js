const Validator = require('fastest-validator');
const validator = new Validator({
	useNewCustomCheckerFunction: true,
	messages: {
		username: 'The \'{field}\' field must be a valid username.',
		stringContainsLowerCaseLatter: 'The \'{field}\' field must contain a lowercase letter.',
		stringContainsUpperCaseLatter: 'The \'{field}\' field must contain a uppercase letter.',
		stringContainsNumber: 'The \'{field}\' field must contain a number.',
		id: 'This \'{field}\' must be a valid ID.',
	},
});

module.exports = {
	validator,
};
