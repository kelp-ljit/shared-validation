const ExpressRouter = require('../models/express-router');
const userHandler = require('../handlers/user-handler');

const expressRouter = new ExpressRouter();

expressRouter.post('/login', userHandler.login);
expressRouter.post('/users', userHandler.register);

expressRouter.post('/root/users', userHandler.rootCreateUser);

module.exports = expressRouter.router;
