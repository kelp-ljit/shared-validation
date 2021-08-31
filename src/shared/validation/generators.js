function generatePaginationSearchFormSchema({sortFields}) {
	return {
		...generatePaginationSchema({sortFields}),
		keyword: {
			optional: true,
			empty: true,
			type: 'string',
			max: 1024,
		},
	};
}

/**
 * @param {Array<string>} sortFields - ex: ['createdAt']
 * @returns {{index: Object, size: Object, sort: Object}} - The fastest-validator schema.
 */
function generatePaginationSchema({sortFields}) {
	return {
		index: {
			optional: true,
			type: 'number',
			convert: true,
			integer: true,
			min: 0,
		},
		size: {
			optional: true,
			type: 'number',
			convert: true,
			integer: true,
			min: 1,
			max: 100,
		},
		sort: {
			optional: true,
			type: 'string',
			fields: sortFields,
			fieldPattern: /^-?(.*)$/,
			custom(value, errors, schema) {
				value?.split(' ').forEach(item => {
					if (!item) {
						errors.push({type: 'required', expected: schema.fields, actual: value});
					}

					const fieldName = item.match(schema.fieldPattern)[1];
					if (!schema.fields.includes(fieldName)) {
						errors.push({type: 'enumValue', expected: schema.fields, actual: fieldName});
					}
				});

				return value;
			},
		},
	};
}

module.exports = {
	generatePaginationSchema,
	generatePaginationSearchFormSchema,
};
