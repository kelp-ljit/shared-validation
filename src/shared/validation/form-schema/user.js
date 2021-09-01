const {generatePaginationSchema} = require('../generators');
const userSchema = require('../model-schema/user');

exports.registerFormSchema = {
	username: {
		...userSchema.username,
		optional: false,
		empty: false,
	},
	email: userSchema.email,
	password: userSchema.password,
};

exports.loginFormSchema = {
	email: userSchema.email,
	password: {
		...userSchema.password,
		min: 1,
		isNeedLowerCase: false,
		isNeedUpperCase: false,
		isNeedNumber: false,
	},
};

exports.rootCreateUserFormSchema = {
	username: {
		...userSchema.username,
		optional: false,
		empty: false,
	},
	email: userSchema.email,
	permission: userSchema.permission,
};

exports.rootGetUsersFormSchema = {
	...generatePaginationSchema({sortFields: ['createdAt']}),
	permission: {
		...userSchema.permission,
		optional: true,
	},
};
