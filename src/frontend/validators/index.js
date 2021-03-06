const Validator = require('fastest-validator');
const _ = require('../languages');

const validator = new Validator({
	useNewCustomCheckerFunction: true,
	messages: {
		required: _('validation-required'),
		string: _('validation-string'),
		stringEmpty: _('validation-stringEmpty'),
		stringMin: _('validation-stringMin'),
		stringMax: _('validation-stringMax'),
		stringLength: _('validation-stringLength'),
		stringPattern: _('validation-stringPattern'),
		stringContains: _('validation-stringContains'),
		stringEnum: _('validation-stringEnum'),
		stringNumeric: _('validation-stringNumeric'),
		stringAlpha: _('validation-stringAlpha'),
		stringAlphanum: _('validation-stringAlphanum'),
		stringAlphadash: _('validation-stringAlphadash'),
		stringHex: _('validation-stringHex'),
		stringSingleLine: _('validation-stringSingleLine'),
		stringBase64: _('validation-stringBase64'),
		number: _('validation-number'),
		numberMin: _('validation-numberMin'),
		numberMax: _('validation-numberMax'),
		numberEqual: _('validation-numberEqual'),
		numberNotEqual: _('validation-numberNotEqual'),
		numberInteger: _('validation-numberInteger'),
		numberPositive: _('validation-numberPositive'),
		numberNegative: _('validation-numberNegative'),
		array: _('validation-array'),
		arrayEmpty: _('validation-arrayEmpty'),
		arrayMin: _('validation-arrayMin'),
		arrayMax: _('validation-arrayMax'),
		arrayLength: _('validation-arrayLength'),
		arrayContains: _('validation-arrayContains'),
		arrayUnique: _('validation-arrayUnique'),
		arrayEnum: _('validation-arrayEnum'),
		tuple: _('validation-tuple'),
		tupleEmpty: _('validation-tupleEmpty'),
		tupleLength: _('validation-tupleLength'),
		boolean: _('validation-boolean'),
		currency: _('validation-currency'),
		date: _('validation-date'),
		dateMin: _('validation-dateMin'),
		dateMax: _('validation-dateMax'),
		enumValue: _('validation-enumValue'),
		equalValue: _('validation-equalValue'),
		equalField: _('validation-equalField'),
		forbidden: _('validation-forbidden'),
		function: _('validation-function'),
		email: _('validation-email'),
		emailEmpty: _('validation-emailEmpty'),
		emailMin: _('validation-emailMin'),
		emailMax: _('validation-emailMax'),
		luhn: _('validation-luhn'),
		mac: _('validation-mac'),
		object: _('validation-object'),
		objectStrict: _('validation-objectStrict'),
		objectMinProps: _('validation-objectMinProps'),
		objectMaxProps: _('validation-objectMaxProps'),
		url: _('validation-url'),
		urlEmpty: _('validation-urlEmpty'),
		uuid: _('validation-uuid'),
		uuidVersion: _('validation-uuidVersion'),
		classInstanceOf: _('validation-classInstanceOf'),
		objectID: _('validation-objectID'),

		username: _('validation-username'),
		stringContainsLowerCaseLatter: _('validation-stringContainsLowerCaseLatter'),
		stringContainsUpperCaseLatter: _('validation-stringContainsUpperCaseLatter'),
		stringContainsNumber: _('validation-stringContainsNumber'),
		id: _('validation-id'),
	},
});

module.exports = {
	validator,
};
