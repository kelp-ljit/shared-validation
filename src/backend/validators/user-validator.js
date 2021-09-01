const {validator} = require('.');
const {
	loginFormSchema,
	registerFormSchema,
	rootCreateUserFormSchema,
	rootGetUsersFormSchema,
} = require('../../shared/validation/form-schema/user');

module.exports = {
	validateLoginBody: validator.compile(loginFormSchema),
	validateRegisterBody: validator.compile(registerFormSchema),
	validateRootCreateUserBody: validator.compile(rootCreateUserFormSchema),
	validateRootGetUsersQuery: validator.compile(rootGetUsersFormSchema),
};
