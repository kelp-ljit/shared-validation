const {generatePaginationSchema} = require('../../generators');
const userSchema = require('../../model-schema/user');

exports.createUserFormSchema = {
	username: {
		...userSchema.username,
		optional: false,
		empty: false,
	},
	email: userSchema.email,
	permission: userSchema.permission,
};

exports.getUsersFormSchema = {
	...generatePaginationSchema({sortFields: ['createdAt']}),
	permission: {
		...userSchema.permission,
		optional: true,
	},
};
