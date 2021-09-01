const {validator} = require('.');
const {
	loginFormSchema,
	registerFormSchema,
} = require('../../shared/validation/form-schema/user');

module.exports = {
	validateLoginForm: validator.compile(loginFormSchema),
	validateRegisterForm: validator.compile(registerFormSchema),
};
