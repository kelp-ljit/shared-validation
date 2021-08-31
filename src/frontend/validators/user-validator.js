const {validator} = require('.');
const {
	loginFormSchema,
} = require('../../shared/validation/form-schema/user');

module.exports = {
	validateLoginForm: validator.compile(loginFormSchema),
};
