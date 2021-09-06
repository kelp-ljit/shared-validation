/**
 * Convert the fastest-validator validate function for Formik.
 * @param {function} checkFunction
 * @returns {(function(values): Object)}
 */
exports.makeFormikValidator = checkFunction => values => {
	const result = {};
	const checkResult = checkFunction(values);

	if (checkResult === true) {
		return result;
	}

	checkResult.forEach(item => {
		result[item.field] = item.message;
	});
	return result;
};

/**
 * Generate html ids by from schema.
 * 	{email: {Schema}} -> {email: "0.z3bganqr6oh"}
 * @param {Object} formSchema
 * @returns {Object}
 */
exports.generateIdsByFormSchema = formSchema => Object.fromEntries(
	Object.keys(formSchema).map(key => [key, Math.random().toString(36)]),
);
