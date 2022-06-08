const express = require("express") ;
const parseBody = require('body-parser') ; // thứ 1 : tạo parseBody bằng npm install --save parser-body ??
const app = express() ;

const adminRouter = require('./routes/admin') ;
const shopRouter = require('./routes/shop');

app.use(parseBody.urlencoded({extended: false})) ;  // đây là 1 middleware , chịu trách nhiệm xử lí data từ req ??

app.use('/admin',adminRouter);
app.use(shopRouter) ; 


app.use('/',(req, res, next)=>{  // xử lí tất cả đường dẫn lỗi 
    res.status(404) ; 
    res.send('<h1>PAGE NOT FOUND !!! </h1>'); 

    // res.status(404).send('<h1> ... </h1>'); 
});

app.listen(3000) ; 
