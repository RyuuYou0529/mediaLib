var fs=require('fs');

function deleteOne (path) {
    return new Promise((resolve, reject) => {
        let res={
            success: true,
        }
        if (fs.existsSync(path)) {
            fs.unlinkSync(path);
            resolve(res)
        } else {
            console.log('要删除的文件不存在');
            res.success=false
            resolve(res);
        }
    })
}
module.exports = {
    deleteOne
}