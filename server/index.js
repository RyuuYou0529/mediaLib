const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const static = require('koa-static')
const { uploadFile } = require('./util/upload')

const cors = require("koa2-cors")

const app = new Koa()


/**
 * 使用第三方中间件 start
 */
app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}))

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'

app.use(static(
  path.join( __dirname,  staticPath)
))

app.use(cors())
/**
 * 使用第三方中间件 end
 */


app.use( async ( ctx ) => {
  if ( ctx.method === 'GET' ) {
    let title = 'upload pic async'
    await ctx.render('index', {
      title,
    })
  } else if ( ctx.url === '/api/picture/upload' && ctx.method === 'POST' ) {
    // 上传文件请求处理
    let result = { success: false }
    let serverFilePath = path.join( __dirname, 'static/image' )

    // 上传文件事件
    result = await uploadFile( ctx, {
      //fileType: 'album', //暂时取消
      path: serverFilePath
    })
    ctx.body = result
    console.log(result)
  } else if ( ctx.url === 'api/picture/getAll' && ctx.method === 'GET' ) {
  }
  else {
    // 其他请求显示404
    ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
  }

})


app.listen(3000, () => {
  console.log('server is starting at http://localhost:3000')
})
