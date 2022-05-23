// task 03
const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, dirList) => {
    if(!err) {
        dirList.forEach(item => {
            fs.stat(path.resolve(__dirname, 'secret-folder', item.name), ((err, stats) => {
                if(!err) {
                    let extension = path.extname(item.name).split('.')[1];
                    if(stats.isFile()){
                        console.log(`${item.name.split('.')[0]} - ${extension} - ${stats.size/1000}kb`);
                    }     
                } else throw err                      
            }))     
        })
    } else throw err
})