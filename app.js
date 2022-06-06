const http = require('http'); // khởi tạo http chạy server
const routes = require("./routes") ; 
const express = require("express") ;
const { Console } = require('console');


const app = express() ;
app.use('/',(req, res, next)=>{
    console.log('Luon xu li o day dau tien !') ; 
    next() ; 
});
app.use('/add-product',(req, res ,next)=>{
    res.send("<h1>The Add product page</h1>")
})
app.use('/',(req, res ,next)=>{
    res.send("<h1>Đây là slash </h1>")
});

app.listen(3000) ; 
