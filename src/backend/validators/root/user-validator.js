const {validator} = require('../');
const {
	createUserFormSchema,
	getUsersFormSchema,
} = require('../../../shared/validation/form-schema/root/user');

module.exports = {
	validateCreateUserBody: validator.compile(createUserFormSchema),
	validateGetUsersQuery: validator.compile(getUsersFormSchema),
};
