const express = require("express") ;
const parseBody = require('body-parser') ; // thứ 1 : tạo parseBody bằng npm install --save parser-body ??
const app = express() ;

const adminRouter = require('./routes/admin') ;
const shopRouter = require('./routes/shop');

app.use(parseBody.urlencoded({extended: false})) ;  // đây là 1 middleware , chịu trách nhiệm xử lí data từ req ??

app.use(adminRouter);
app.use(shopRouter) ; 

app.listen(3000) ; 
