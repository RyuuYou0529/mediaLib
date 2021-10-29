const router = require('koa-router')();
const upload = require('../util/upload');
const remove = require('../util/remove');

const subRouters = router
    .post('/', async (ctx) => {
        console.log('<router-file-upload>');
        try {
            ctx.body = await upload.uploadFile(
                ctx,
                {
                    path: ctx.request.body.path,
                    fileType: ctx.request.body.fileType
                }
            );
            ctx.status = 200;
        } catch (error) {
            ctx.body = error;
            ctx.status=403;
        } finally {
            console.log(ctx.response);
        }
    })
    .delete('/', async (ctx) => {
        console.log('<router-file-remove>');
        try {
            ctx.body = await remove.rmOneFile(ctx.request.body.path);
            ctx.status = 200;
        } catch (error) {
            ctx.body = error;
            ctx.status=403;
        } finally {
            console.log(ctx.response);
        }
    });

module.exports = subRouters;