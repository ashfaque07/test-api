const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

function writeDataToFile(file, content){
    try {
        fs.writeFileSync(file, JSON.stringify(content), 'utf8', (error) => {
            if (error) {
                console.log(error);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                resolve(body);
            });
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    writeDataToFile,
    getPostData
}