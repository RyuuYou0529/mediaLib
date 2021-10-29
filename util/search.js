const fs = require('fs');
const path = require('path');
const global = require('../global');

/**
 * 获取指定路径的文件
 * @param {string} filePath 
 * @returns {promise}
 */
function getFiles(filePath){
    let locPath = path.join(global.staticPath,filePath);
    return new Promise((resolve, reject) => {
        let result = {
            success: false,
            message: '',
            files: [],
            dirs: []
        }
        fs.readdir(locPath, function(error, files){
            if(error){
                console.log('Error in function getAllFile. Error info:');
                console.log(error);
                result.message = 'error in readdir'
                reject(result);
            }else{
                files.forEach(function(filename){
                    let curPath = path.join(locPath, filename);
                    if(fs.statSync(curPath).isDirectory()){
                        result.dirs.push(filename);
                    }else{
                        result.files.push(filename);
                    }
                })
                result.success = true;
                result.message = 'readdir ok'
                resolve(result);
            }
        });
    })
}

module.exports = {
    getFiles
}