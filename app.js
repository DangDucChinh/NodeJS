const express = require("express") ;
const parseBody = require('body-parser') ; // thứ 1 : tạo parseBody bằng npm install --save parser-body ??
const path = require('path');
const rootDir = require('./util/path');
const app = express() ;

const adminData = require('./routes/admin') ;
const shopRouter = require('./routes/shop');

app.use(parseBody.urlencoded({extended: false})) ;  // đây là 1 middleware , chịu trách nhiệm xử lí data từ req ??

// Và nó có 'public' rồi nên các thành phần static bên trong sẽ ko có public nữa
app.use(express.static(path.join(__dirname, 'public'))); 
app.use('/admin',adminData.router);
app.use(shopRouter) ; 


app.use('/',(req, res, next)=>{  // xử lí tất cả đường dẫn lỗi 
    res.status(404) ; 
    res.sendFile(path.join(rootDir, 'views','404.html')); // ko cần ../ ( thư mục cha của thằng đang chạy)
});

app.listen(3000) ; 
