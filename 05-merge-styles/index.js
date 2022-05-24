//task 05
const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'styles');
const targetPath = path.join(__dirname, 'project-dist', 'bundle.css');

main(srcPath, targetPath)

async function main (src, target) {   
    const srcFiles = await fs.promises.readdir(src, {withFileTypes: true})   
    const items = srcFiles.filter(item => {
        return (item.isFile() && path.extname(item.name) === '.css')     
    })
    const wrirableStream = fs.createWriteStream(target, {encoding: 'utf-8'})   
    items.forEach(item => {
        const readableStream = fs.createReadStream(path.join(src, item.name), {encoding: 'utf-8'})
        readableStream.on('data', chunk => {wrirableStream.write(chunk)})
    })   
}