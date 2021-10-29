const router = require('koa-router')();
const upload = require('../util/upload');
const remove = require('../util/remove');
const search = require('../util/search')

const subRouters = router
    .get('/', async (ctx) => {
        console.log('<router-search>');
        try {
            ctx.body = await search.getFiles(ctx.query.path);
            ctx.status = 200;
        } catch (error) {
            ctx.body = error;
            ctx.status=403;
        } finally {
            console.log(ctx.response);
        }
    })
    .post('/', async (ctx) => {
        console.log('<router-dir-upload>');
        try {
            ctx.body = await upload.mkdirsSync(ctx.request.body.path);
            ctx.status = 200;
        } catch (error) {
            ctx.body = error;
            ctx.status=403;
        } finally {
            console.log(ctx.response);
        }
    })
    .delete('/', async (ctx) => {
        console.log('<router-dir-remove>');
        try {
            ctx.body = await remove.rmOneDir(ctx.request.body.path);
            ctx.status = 200;
        } catch (error) {
            ctx.body = error;
            ctx.status=403;
        } finally {
            console.log(ctx.response);
        }
    });

module.exports = subRouters;