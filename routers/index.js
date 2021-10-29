const routers = require('koa-router')();

const dir = require('./dir');
const file = require('./file');

routers.use('/dir', dir.routes(), dir.allowedMethods());
routers.use('/file', file.routes(), file.allowedMethods());

module.exports = routers