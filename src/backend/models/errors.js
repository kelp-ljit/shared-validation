class Http400 extends Error {
	/**
	 * @param {*} message
	 * @param {{frontendOperationCode: string, frontendOperationValues: *}|undefined} extra
	 */
	constructor(message, extra) {
		super(message || 'bad request');
		if (message?.stack) {
			this.secondaryStack = this.stack;
			this.stack = message.stack;
		}

		this.status = 400;
		this.extra = extra;
	}
}

class Http404 extends Error {
	/**
	 * @param {*} message
	 * @param {{frontendOperationCode: string, frontendOperationValues: *}|undefined} extra
	 */
	constructor(message, extra) {
		super(message || 'resource not found');
		if (message?.stack) {
			this.secondaryStack = this.stack;
			this.stack = message.stack;
		}

		this.status = 404;
		this.extra = extra;
	}
}

class Http500 extends Error {
	/**
	 * @param {*} message
	 * @param {{frontendOperationCode: string, frontendOperationValues: *}|undefined} extra
	 */
	constructor(message, extra) {
		super(message || 'server error');
		if (message?.stack) {
			this.secondaryStack = this.stack;
			this.stack = message.stack;
		}

		this.status = 500;
		this.extra = extra;
	}
}

module.exports = {
	Http400,
	Http404,
	Http500,
};
