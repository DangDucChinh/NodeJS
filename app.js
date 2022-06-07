const http = require('http'); // khởi tạo http chạy server
const routes = require("./routes") ; 
const express = require("express") ;
const { Console } = require('console');

const parseBody = require('body-parser') ; // thứ 1 : tạo parseBody bằng npm install --save parser-body ??

const app = express() ;
app.use('/',(req, res, next)=>{
    console.log('Luon xu li o day dau tien !') ; 
    next() ; 
});
app.use(parseBody.urlencoded({extended: false})) ;  // đây là 1 middleware , chịu trách nhiệm xử lí data từ req ??
app.use('/add-product',(req, res ,next)=>{
    res.send(`<form action="/product" method="POST">
                    <input type="text" name="title"/>
                    <button type="submit">Add Product<button>
                </form>`);
})
app.post('/product',(req, res , next)=>{
    console.log(req.body) ; // sau khi được chịu trách nhiệm xử lí data , body đã tạo thành 1 đối tượng  
    res.redirect('/') ; 
});
app.use('/',(req, res ,next)=>{
    res.send("<h1>Hello from Node JS</h1>");
});

app.listen(3000) ; 
