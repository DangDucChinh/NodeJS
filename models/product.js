const fs = require('fs') ; 
const path = require('path');


module.exports = class Product{ 
    constructor(t,n){
        this.title = t ;
        this.name = n ;
    }
    save(){
        
        //process.mainModule.filename : lấy đường dẫn đầy đủ của ướng dụng
        // có lẽ là nó mở vào trong node-js-first-app
        const p = path.join(path.dirname(require.main.filename),
        'data',
        'products.json');
        // thư mục data mới , tạo thư mục data trc vì xung đột quyền;
        fs.readFile(p, (err, fileContent)=>{
            let products = [];
            if(!err){
                products = JSON.parse(fileContent) ;
                console.log(fileContent) ; 
                // tạo mảng mới , nếu ko có lỗi mở file thì cho phép đọc n
            }
            products.push(this) ; 
            fs.writeFile(p, JSON.stringify(products), (err)=>{
                console.log(err) ; 
            });
        }); 
    }
    static fetchAll(){
        const p = path.join(path.dirname(require.main.filename),
        'data',
        'products.json');
        fs.readFile(p, (err, fileContent)=>{
            if(err){
                return [];
            }
            return JSON.parse(fileContent) ; 
        });
        return products ; 
    }
}