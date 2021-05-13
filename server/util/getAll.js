var fs=require('fs');
var path=require('path');

var extnames = ['.jpg', '.png', '.jpeg']

function getAllFile(ctx, filePath){
    return new Promise((resolve, reject) => {
        let res = {
            success:  "true",
            message: "url获取成功",
            collection: []
        }
        fs.readdir(filePath, function(err, files){
            if(err){
                console.log(err);
            }else{
                files.forEach(function(fileName){
                    if(extnames.includes(path.extname(fileName))){
                        res.collection.push(`http://${ctx.host}/image/${fileName}`);  
                    }
                })
                resolve(res);
            }
        });
    })
}
module.exports = {
    getAllFile
}