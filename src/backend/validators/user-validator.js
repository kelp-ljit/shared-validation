const {validator} = require('.');
const {
	loginFormSchema,
	registerFormSchema,
} = require('../../shared/validation/form-schema/user');

module.exports = {
	validateLoginBody: validator.compile(loginFormSchema),
	validateRegisterBody: validator.compile(registerFormSchema),
};
