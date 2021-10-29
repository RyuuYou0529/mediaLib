const koa = require('koa');
const cors = require('koa2-cors');
const koaBody = require('koa-body');
const static = require('koa-static');
const path = require('path');

const routers = require('./routers/index');
const global = require('./global');

const app = new koa();

app.use(cors({}));
app.use(koaBody({
    multipart: true,
    parsedMethods: ['GET', 'POST', 'DELETE'],
    formLimit: {
        uploadDir: path.join('./temp'),
        keepExtensions: true,
    }
}));
app.use(static(global.staticPath));
app.use(routers.routes()).use(routers.allowedMethods());

app.listen(3000, () => {
    console.log('server is starting at http://127.0.0.1:3000');
})