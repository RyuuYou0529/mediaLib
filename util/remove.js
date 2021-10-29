const fs = require('fs');
const path = require('path');
const global = require('../global');

/**
 * 删除一个文件
 * @param {string} filePath 
 * @returns {promise}
 */
function rmOneFile (filePath) {
    let locPath = path.join(global.staticPath, filePath);
    let result={
        success: false,
        message: '',
        url: filePath
    }
    return new Promise((resolve, reject) => {
        if (fs.existsSync(locPath)) {
            fs.unlinkSync(locPath);
            result.success = true;
            result.message = 'rmFile ok';
            resolve(result)
        } else {
            console.log('no this file');
            result.message = 'rmFile error';
            reject(result);
        }
    })
}

/**
 * 删除一个目录及该目录下的所有文件
 * @param {string} localPath 
 */
function deleteAll(localPath){
    let files = fs.readdirSync(localPath);
    files.forEach(function(filename,index){
        let curPath = path.join(localPath, filename);
        if(fs.statSync(curPath).isDirectory()){
            deleteAll(curPath);
        }else{
            fs.unlinkSync(curPath);
        }
    });
    fs.rmdirSync(localPath);
}

/**
 * 删除一个目录及该目录下的所有文件，对deleteAll的封装
 * @param {string} dirPath 
 * @returns {promise}
 */
function rmOneDir (dirPath){
    let locPath = path.join(global.staticPath, dirPath);
    let result = {
        success: false,
        message: '',
        url: dirPath
    }
    return new Promise((resolve, reject) => {
        if(fs.existsSync(locPath)&&fs.statSync(locPath).isDirectory()){
            deleteAll(locPath);
            result.success = true;
            result.message = 'rmDir ok'
            resolve(result);
        }else{
            console.log('dir path error');
            result.message = 'invalid dir'
            reject(result);
        }
    })
}

module.exports = {
    rmOneFile,
    rmOneDir
}