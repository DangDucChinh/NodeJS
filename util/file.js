const fs = require('fs');

const deleteFile = (filePath)=>{
    fs.unlink(filePath , (err)=>{  // xóa tên và tệp dc kết nối với tên
        if(err){
        console.log('Ko xóa được tệp trong until / file.js') ; 
        throw (err); // ném nó nổi lên cho express xử lí 
        }
    });
}

exports.deleteFile = deleteFile ; 