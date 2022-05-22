const fs = require('fs');
const path = require('path').join('01-read-file', 'text.txt');

const readableStream = fs.createReadStream(path, {encoding: 'utf-8'});
async function main() {
let data = '';
    readableStream.on('data', chunk => data += chunk);
    readableStream.on('end', function() {console.log(data)});
};
main()



