// task2 
const fs = require('fs');
const path = require('path');
const readline = require('readline');

let rl = readline.createInterface({input: process.stdin, output: process.stdout});
main();

function main () {
    fs.writeFile(
        path.join('02-write-file', 'myText.txt'),
        '',
        (err) => {
            if (err) throw err
            console.log('File has been created.')
            inputText();
            
            function inputText() {
                rl.question('Enter text ', (data) => {
                    if(data == 'exit') {console.log('Good Bye!!!'); rl.close();}
                       else {              
                        fs.appendFile(
                            path.join('02-write-file', 'myText.txt'),
                            data,
                            err => {if (err) throw err}
                        )

                        inputText();
                       }   
                    });
                    
                    rl.on('close', () => {
                        console.log('Good Bye!!!');
                        process.exit(0);
                      });
            }      
        }
    )   
};