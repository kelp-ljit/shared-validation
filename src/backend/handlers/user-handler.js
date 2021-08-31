const {
	Http400,
	Http422,
} = require('../models/errors');
const {
	validateLoginBody,
} = require('../validators/user-validator');
const {
	ACCOUNT_PAGES: {
		SHOW_INVALID_PASSWORD_ALERT,
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
