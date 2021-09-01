const {
	Http400,
	Http409,
	Http422,
} = require('../models/errors');
const {
	validateLoginBody,
	validateRegisterBody,
	validateRootCreateUserBody,
} = require('../validators/user-validator');
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
	const checkBodyResult = validateLoginBody(req.body);
	const {email, password} = req.body;

	if (checkBodyResult !== true) {
		throw new Http422('validation failed', checkBodyResult);
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
	const checkBodyResult = validateRegisterBody(req.body);
	const {username, email, password} = req.body;

	if (checkBodyResult !== true) {
		throw new Http422('validation failed', checkBodyResult);
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
	const checkBodyResult = validateRootCreateUserBody(req.body);
	const {username, email, permission} = req.body;

	if (checkBodyResult !== true) {
		throw new Http422('validation failed', checkBodyResult);
	}

	res.json({username, email, permission});
};
