const express = require('express');
const mainRouter = express.Router();
const authRouter = require('./auth');
// endpoint handler
mainRouter.use('/auth', authRouter);
module.exports = mainRouter;