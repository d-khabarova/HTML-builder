const fs = require('fs');
const path = require('path');


const secretPath = path.join(__dirname, 'secret-folder');

fs.readdir(secretPath, {withFileTypes : true}, (err, files) => {
    if(err) throw err;
    files.forEach(file => {
        if(file.isFile()){
            const filePath = path.join(secretPath,file.name);
            const fileInfo = path.parse(filePath); 
            fs.stat(filePath, (err, stats) => {
                if(err) throw err;
                const size = (stats['size'] / 1024).toFixed(3);
                console.log(fileInfo.name + ' - ' + fileInfo.ext.replace('.','') + ' - ' + size + 'kb');
            });            
        }
    })
    
});