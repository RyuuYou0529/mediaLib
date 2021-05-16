const Koa = require('koa')
const cors = require("koa2-cors")
const path = require('path')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')

const upload = require('./util/upload')
const getAll = require('./util/getAll')
const deleteFile = require('./util/delete')

const app = new Koa()

/**
 * 使用第三方中间件 start
 */
 app.use(cors({}))
 app.use(bodyParser())

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'

app.use(static(
  path.join( __dirname,  staticPath)
))
/**
 * 使用第三方中间件 end
 */

app.use( async ( ctx ) => {
  var result = {code: 500}
  //上传图片
  if ( ctx.url === '/api/picture/upload' && ctx.method === 'POST' ) {
    let serverFilePath = path.join( __dirname, './static/upload' )
    result = await upload.uploadFile( ctx, {
      path: serverFilePath
    })
    if(result.success){
      ctx.status=200
      ctx.body = {
        url: result.url
      }
    }else{
      ctx.status=500
      ctx.message="upload error"
    }
    console.log(ctx.response)
  }
  //获取所有图片
  else if ( ctx.url === '/api/picture/getAll' && ctx.method === 'GET' ) {
    result = await getAll.getAllFile(ctx, "./static/upload")
    if(result.success){
      ctx.status=200
      ctx.body = {
        collection: result.collection
      }
    }else{
      ctx.status=500
      ctx.message="getAll error"
      ctx.body = {
        collection: []
      }
    }
    console.log(ctx.response)
  }
  //删除一张图片
  else if ( ctx.url === '/api/picture/deleteOne' && ctx.method === 'DELETE' ) {
    console.log('delete: ', ctx.request.body)
    result = await deleteFile.deleteOne(`./static/upload/${ctx.request.body.name}`)
    if(result.success){
      ctx.status=200
    }else{
      ctx.status=500
      ctx.message="delete error"
    }
    console.log(ctx.response)
  }
  //其他请求显示404
  else {
    ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
  }

})

app.listen(3000, () => {
  console.log('server is starting at http://localhost:3000')
})
