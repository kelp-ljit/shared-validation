const {
	Http400,
	Http409,
	Http422,
} = require('../models/errors');
const {
	validateLoginBody,
	validateRegisterBody,
} = require('../validators/user-validator');
const {
	validateCreateUserBody,
	validateGetUsersQuery,
} = require('../validators/root/user-validator');
const {
	ACCOUNT_PAGES: {
		SHOW_INVALID_PASSWORD_ALERT,
		SHOW_USERNAME_WAS_TOKEN_ALERT,
	},
} = require('../../shared/constants/frontend-operation-code');

/*
	POST /api/login
 */
exports.login = (req, res) => {
	const checkResult = validateLoginBody(req.body);
	const {email, password} = req.body;

	if (checkResult !== true) {
		throw new Http422('validation failed', checkResult);
	}

	if (password === '123') {
		res.json({email, password});
	} else {
		throw new Http400('invalid password', {
			frontendOperationCode: SHOW_INVALID_PASSWORD_ALERT,
		});
	}
};

/*
	POST /api/users
 */
exports.register = (req, res) => {
	const checkResult = validateRegisterBody(req.body);
	const {username, email, password} = req.body;

	if (checkResult !== true) {
		throw new Http422('validation failed', checkResult);
	}

	if (username === 'kelp') {
		throw new Http409('conflict', {
			frontendOperationCode: SHOW_USERNAME_WAS_TOKEN_ALERT,
		});
	}

	res.json({username, email, password});
};

/*
	POST /api/root/users
 */
exports.rootCreateUser = (req, res) => {
	const checkResult = validateCreateUserBody(req.body);
	const {username, email, permission} = req.body;

	if (checkResult !== true) {
		throw new Http422('validation failed', checkResult);
	}

	res.json({username, email, permission});
};

/*
	GET /api/root/users
 */
exports.rootGetUsers = (req, res) => {
	const checkResult = validateGetUsersQuery(req.query);
	const {permission, sort, index = 0, size = 20} = req.query;

	if (checkResult !== true) {
		throw new Http422('validation failed', checkResult);
	}

	res.json({permission, index, size, sort});
};
