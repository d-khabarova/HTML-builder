const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, 'styles');
const destPath = path.join(__dirname, 'project-dist');

fs.readdir(destPath, {withFileTypes : true}, (err, files) => {
    if(err) throw err;
    files.forEach(file => {
        if(file.isFile() && file.name == 'bundle.css'){
            fs.unlink(path.join(destPath, file.name), err => {
                if(err) throw err;
            });
        }
    });
});


    
  
fs.readdir(sourcePath, {withFileTypes : true}, (err, files) => {
    if(err) throw err;
    const output = fs.createWriteStream(path.join(destPath, 'bundle.css'));
    files.forEach(file => {
        if(file.isFile()){
            const ext = path.extname(path.join(sourcePath, file.name));
            if(ext == '.css'){
                const input = fs.createReadStream(path.join(sourcePath, file.name), 'utf-8');
                input.pipe(output);
            }
        }
    });
});
    
   


