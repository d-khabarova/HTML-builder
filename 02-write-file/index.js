const fs = require('fs');
const path = require('path');

const { stdin, stdout } = process;
const output = fs.createWriteStream(path.join(__dirname,"text.txt"));

stdout.write("Введите текст для записи в файл, пожалуйста\n");
stdin.on('data', data => {    
    if(data.toString().trim() == 'exit'){
        process.exit();
    }
    else{
        output.write(data);       
    }
        
});

process.on('exit', () => stdout.write("До свидания, всего доброго, хорошего настроения, здоровья!"));
process.on('SIGINT', () => process.exit());
