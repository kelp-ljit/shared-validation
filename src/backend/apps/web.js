const http = require('http');
const path = require('path');
const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const morgan = require('morgan');
const nocache = require('nocache');
const {Http404} = require('../models/errors');
const webRouter = require('../routers/web-router');
const baseHandler = require('../handlers/base-handler');

const app = express();
const server = http.createServer(app);

app.disable('etag');

app.locals.archive = (object = null) => Buffer.from(JSON.stringify(object)).toString('base64');
app.locals.config = {
	ASSETS_PATH: config.ASSETS_PATH,
};

ejs.delimiter = '?';
app.set('views', path.join(__dirname, '..', '..', 'frontend', 'express'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(nocache(), webRouter);

// Error handlers
app.use((req, res, next) => {
	// Didn't match any routers.
	next(new Http404());
});
app.use((error, req, res, _) => {
	error.status = error.status || 500;
	res.status(error.status);
	res.locals.error = error;

	if (req.headers.accept && req.headers.accept.includes('application/json')) {
		// Return JSON.
		res.json({
			message: `${error}`,
			extra: error.extra,
		});
	} else {
		// Return HTML.
		baseHandler.getBaseView(req, res);
	}
});

module.exports = {app, server};
