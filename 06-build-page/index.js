const fs = require('fs');
const path = require('path');
const fsPromis = require('fs/promises');

async function copyDir(sourcePath, destPath) {
  try {
    await fs.promises.mkdir(destPath, { recursive: true });
    let entries = await fsPromis.readdir(sourcePath, {withFileTypes: true});
    for (let entry of entries) {
      if (entry.isFile()) {
        copyFiles(sourcePath, destPath, entry);
      } else {
        copyDir(path.join(sourcePath, entry.name), path.join(destPath, entry.name));
      }
    }
  } catch (error) {
    console.log(error);
  }

}

function copyFiles (sourcePath, destPath, file) {
    fs.copyFile( path.join(sourcePath, file.name), path.join(destPath, file.name), err => {
      if (err) throw err;
    });
  }


function mergeStyles(sourcePath,destPath){
    fs.readdir(sourcePath, {withFileTypes : true}, (err, files) => {
        if(err) throw err;
        const output = fs.createWriteStream(path.join(destPath, 'style.css'));
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
}


function createIndex(data){
    const srcComponents = path.join(__dirname, 'components');
    if(data.indexOf('{{') !== -1) {
        const startComponent = data.indexOf('{{');
        const endComponent = data.indexOf('}}');
        const stream = fs.createReadStream(path.join(srcComponents, `${data.slice(startComponent + 2, endComponent)}.html`), 'utf-8');
        let temp='';
        stream.on('data', chunk => temp+=chunk);
        stream.on('end', () => {
            data = data.replace(data.slice(startComponent - 4, endComponent + 2), temp);
            createIndex(data);
        });
    } else {
    const output = fs.createWriteStream(path.join(destStylePath, 'index.html'), 'utf-8');
    output.write(data);
    }
}

function readTemplate(file){
    const stream = fs.createReadStream(file, 'utf-8');
    let data = '';
    
    stream.on('data', chunk => data+=chunk);
    stream.on('end', () => {
        createIndex(data);
    });
    stream.on('error', error => console.log(error.message));
}

const destStylePath = path.join(__dirname, 'project-dist');
const src = path.join(__dirname, 'assets');
const dest = path.join(__dirname, path.join('project-dist','assets'));
const sourceStylePath = path.join(__dirname, 'styles');

copyDir(src, dest);
mergeStyles(sourceStylePath,destStylePath);
readTemplate(path.join(__dirname, 'template.html'));

