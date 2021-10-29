const path = require('path');
const fs = require('fs');

const global = require('../global');

/**
 * 同步创建文件夹
 * @param {string} dirName 
 * @returns {boolean}
 */
function mkdirsSync(dirName) {
    let result = { 
        success: false,
        message: '',
        url: dirName
    }
    let locPath = path.join(global.staticPath,dirName);
    return new Promise((resolve, reject)=>{
        if(fs.existsSync(locPath)){
            result.message = 'the dir has existed';
            reject(result);
        }else{
            fs.mkdirSync(locPath);
            result.success = true;
            result.message = 'mkdir ok';
            resolve(result);
        }
    })
}

/**
 * 判断扩展名是否合法
 * @param {string} fileName 
 * @returns {boolean}
 */
function judgeExtName(fileName){
    try {
        let extName = path.extname(fileName);
        return global.extnames.includes(extName);
    } catch (error) {
        console.log('Exception in function getExtName. Error info:');
        console.log(error);
    }
}

/**
 * 上传文件
 * @param {object} ctx 
 * @param {object} options
 * @returns {promise} 
 */
async function uploadFile(ctx, options){
    let filePath = path.join(global.staticPath, options.path);

    let file = ctx.request.files.file;

    let result = { 
        success: false,
        message: '',
        url: null
    }
    return new Promise((resolve, reject)=>{
        if(!judgeExtName(file.name)){
            console.log('<uploadFile-judgeExt-error>')
            result.message = 'invalid extName';
            reject(result);
        }

        let rs = fs.createReadStream(file.path);
        let ws = fs.createWriteStream(path.join(filePath, file.name));
        
        rs.pipe(ws);

        ws.on('finish', ()=>{
            result.success = true;
            result.message = 'uploaded';
            result.url = `http://${path.join(ctx.host,options.path,file.name)}`;
            resolve(result);
        });
        ws.on('error', (error)=>{
            console.log('<uploadFile-WriteStream-error>')
            console.log(error)
            result.message = 'error in uploading';
            reject(result);
        });
    });
}

module.exports = {
    uploadFile,
    mkdirsSync
}