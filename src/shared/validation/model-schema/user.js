const USER_PERMISSION = require('../../constants/user-permission');

module.exports = {
	username: {
		optional: true,
		empty: true,
		type: 'string',
		lowercase: true,
		trim: true,
		min: 2,
		max: 16,
		usernamePattern: /^[a-z0-9._-]{1,16}$/,
		custom(value, errors, schema) {
			if (value && !schema.usernamePattern.test(value)) {
				errors.push({
					type: 'username',
					expected: `${schema.usernamePattern}`,
					actual: value,
				});
			}

			return value;
		},
	},
	permission: {
		optional: false,
		type: 'enum',
		values: Object.values(USER_PERMISSION),
	},
	email: {
		optional: false,
		empty: false,
		type: 'email',
		max: 64,
		normalize: true,
	},
	password: {
		optional: false,
		empty: false,
		type: 'string',
		min: 6,
		max: 32,
		isNeedLowerCase: true,
		isNeedUpperCase: true,
		isNeedNumber: true,
		custom(value, errors, schema) {
			if (value) {
				if (schema.isNeedLowerCase && !/[a-z]+/.test(value)) {
					errors.push({type: 'stringContainsLowerCaseLatter', actual: value});
				}

				if (schema.isNeedUpperCase && !/[A-Z]+/.test(value)) {
					errors.push({type: 'stringContainsUpperCaseLatter', actual: value});
				}

				if (schema.isNeedNumber && !/\d+/.test(value)) {
					errors.push({type: 'stringContainsNumber', actual: value});
				}
			}

			return value;
		},
	},
};
