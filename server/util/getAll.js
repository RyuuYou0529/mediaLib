var fs=require('fs');
var path=require('path');

var extnames = ['.jpg', '.png', '.jpeg', 'gif', 'svg', 'bmp']

function getAllFile(ctx, filePath){
    return new Promise((resolve, reject) => {
        let res = {
            success: true,
            collection: []
        }
        fs.readdir(filePath, function(err, files){
            if(err){
                res.success = false;
                console.log(err);
                resolve(res);
            }else{
                files.forEach(function(fileName){
                    if(extnames.includes(path.extname(fileName))){
                        res.collection.push(`/upload/${fileName}`);  
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