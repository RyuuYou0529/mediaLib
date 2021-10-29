const path = require('path')

//const staticPath = path.join(__dirname, './static/');
const staticPath = path.join('./static/');
const extnames = ['.jpg', '.png', '.jpeg', '.gif', '.svg', '.bmp', '.ico'];

module.exports={
    staticPath,
    extnames
}