const {validator} = require('.');
const {
	loginFormSchema,
} = require('../../shared/validation/form-schema/user');

module.exports = {
	validateLoginBody: validator.compile(loginFormSchema),
};
