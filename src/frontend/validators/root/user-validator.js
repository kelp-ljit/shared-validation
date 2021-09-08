const {validator} = require('../');
const {
	createUserFormSchema,
} = require('../../../shared/validation/form-schema/root/user');

module.exports = {
	validateCreateUserForm: validator.compile(createUserFormSchema),
};
