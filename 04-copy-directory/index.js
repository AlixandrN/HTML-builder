//task 04
const fs = require('fs');
const path = require('path');

copyDir()
function copyDir() {
    fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, () => {
        fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true}, (err, dirList) => {
            if(!err) {
                
                dirList.forEach(item => {
                    
                    fs.readFile(path.resolve(__dirname, 'files', item.name), {encoding: 'utf-8'}, (err, data) => {
                        if(!err) {
                            fs.writeFile((path.resolve(__dirname, 'files-copy', item.name)), data, err => {
                                if (err) throw err
                            })
                        }
                        else throw err
                    }
                    )  
                })
               
            } else throw err
        })
    });

    // fs.readdir(path.join(__dirname, 'files-copy'), {withFileTypes: true}, (err, dirList) => {
    //     let arrCopied = [];
    //     if(!err){
    //         dirList.forEach(item => arrCopied.push(item.name))
    //     }
    //     else throw err
    // })
}