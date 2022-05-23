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
                    if(data == 'exit') {rl.close();}
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
                        console.log('\nGood Bye!!!');
                        process.exit(0);
                      });
            }      
        }
    )   
};