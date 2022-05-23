const fs = require('fs');
const path = require('path');

function copyDir(source, dest) {
    const sourcePath = path.join(__dirname, source);
    const destPath = path.join(__dirname, dest);
    
    fs.mkdir(destPath, {recursive : true}, err =>{
        if(err) throw err;
    });
    
    fs.readdir(destPath, {withFileTypes : true}, (err, files) => {
        if(err) throw err;
        files.forEach(file => {
            fs.unlink(path.join(destPath, file.name), err => {
                if(err) throw err;
            });
        });
    });
    
    fs.readdir(sourcePath, {withFileTypes : true}, (err, files) => {
        if(err) throw err;
        files.forEach(file => {
            fs.copyFile(path.join(sourcePath, file.name), path.join(destPath, file.name), err => {
                if(err) throw err;
            });
        });
    });
}

copyDir('files', 'files-copy');
