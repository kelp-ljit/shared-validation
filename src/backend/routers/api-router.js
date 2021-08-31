const ExpressRouter = require('../models/express-router');
const userHandler = require('../handlers/user-handler');

const expressRouter = new ExpressRouter();

expressRouter.post('/login', userHandler.login);

module.exports = expressRouter.router;
