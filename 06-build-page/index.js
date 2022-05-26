//task 06
const fs = require('fs')
const path = require('path')

const srcStyles = path.join(__dirname, 'styles')
const targetFolder = path.join(__dirname, 'project-dist')
const fileCSS = path.join(__dirname, 'project-dist', 'style.css')

fs.rm(targetFolder, { recursive: true }, async()=>{
    await makeDir(targetFolder)
    await createCSSFile(fileCSS)
    await createHTMLFile()
    await createAssetsFolder()
})

//makeDir function
async function makeDir (target) {
    await fs.promises.mkdir(target, { recursive: true })
    console.log('The folder "project-dist" has been created')
};

//createCSSFile function 
async function createCSSFile(target) {
    await fs.promises.writeFile(target, '')
    const cssList = await fs.promises.readdir(srcStyles, {withFileTypes: true})  
    const filterCSSList = cssList.filter(item => {return (item.isFile() && path.extname(item.name) === '.css')})
    const wrirableStream = fs.createWriteStream(target, {encoding: 'utf-8'})
    filterCSSList.forEach(item => {
        const readableStream = fs.createReadStream(path.join(__dirname, 'styles', item.name), {encoding: 'utf-8'})
        readableStream.on('data', chunk => {wrirableStream.write(chunk)})
    })
    console.log('The file "style.css" has been successfully created and filled')    
};

//createHTMLFile function
async function createHTMLFile () {
    let blank = await fs.promises.readFile(path.join(__dirname, 'template.html'), {encoding: 'utf-8'})
   
    const HTMLList = await fs.promises.readdir(path.join(__dirname, 'components'), {withFileTypes: true}) 
    const filterHTMLList = HTMLList.filter(item => {return (item.isFile() && path.extname(item.name) === '.html')})
    
    for (let item of filterHTMLList) {
     const changeText = await fs.promises.readFile(path.join(__dirname, 'components', item.name))
     blank = blank.replace(`{{${item.name.slice(0, -5)}}}`, changeText);  
}
 await fs.promises.writeFile(path.join(targetFolder, 'index.html'), blank)
}

//createAssetsFolder function 
async function createAssetsFolder() {
    fs.rm(path.join(targetFolder, 'assets'), { recursive: true }, async()=> {
        const dir1 = path.join(__dirname, 'assets')
        const dir2 = path.join(targetFolder, 'assets')
        await transfer(dir1, dir2)    
        console.log('The folder "assets" has been created and filled')    
    })
}

// function transfer 
async function transfer(src, target) {
    const stats = await fs.promises.stat(src);
    if (stats.isDirectory()) {
        await fs.promises.mkdir(target, { recursive: true });
        (await fs.promises.readdir(src)).forEach(item => {
            transfer(path.join(src, item), path.join(target, item));
          });
    } else {await fs.promises.copyFile(src, target)}
}