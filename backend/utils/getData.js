// bu fonksiyon json dosyasindan verileri almamizi saglayacak:

const fs = require('fs')

exports.getData = () =>{
return JSON.parse(fs.readFileSync(`${__dirname}/../data.json`))
}