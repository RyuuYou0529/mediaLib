const Koa = require('koa')
const cors = require("koa2-cors")
const views = require('koa-views')
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

app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}))

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'

app.use(static(
  path.join( __dirname,  staticPath)
))
/**
 * 使用第三方中间件 end
 */

app.use( async ( ctx ) => {
  var result = {success: false}

  //获取管理页面
  if ( ctx.url === '/'  && ctx.method === 'GET' ) {
    // 停用
    // let title = 'upload pic async'
    // await ctx.render('index', {
    //   title,
    // })
  }
  //上传图片
  else if ( ctx.url === '/api/picture/upload' && ctx.method === 'POST' ) {
    // 上传文件请求处理
    let serverFilePath = path.join( __dirname, 'static/image' )

    // 上传文件事件
    result = await upload.uploadFile( ctx, {
      //fileType: 'album', //暂时取消
      path: serverFilePath
    })
    ctx.body = result
    console.log(result)
  }
  //获取所有图片
  else if ( ctx.url === '/api/picture/getAll' && ctx.method === 'GET' ) {
    result = await getAll.getAllFile(ctx, "./static/image")
    ctx.body = result
    console.log(result)
  }
  //删除一张图片
  else if ( ctx.url === '/api/picture/deleteOne' && ctx.method === 'DELETE' ) {
    console.log('delete: ', ctx.request.body)
    result = await deleteFile.deleteOne(`./static/image/${ctx.request.body.name}`)
    ctx.body = result
    console.log(result)
  }
  //其他请求显示404
  else {
    ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
  }

})


app.listen(3000, () => {
  console.log('server is starting at http://localhost:3000')
})
