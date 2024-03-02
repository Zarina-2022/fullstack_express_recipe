// dosyayi guncellerken kullanacagimiz bir fonksiyon
// mesela bir veri silindiginde, update, veya yeni bir veri eklendiginde.
// gonderdigimiz veriyi json dosyasina aktaran bir tane fonksiyon olsun 

const fs = require("fs")

exports.setData = (data) => {
    fs.writeFileSync(`${__dirname}/../data.json`, JSON.stringify(data), () => {})
}


