const http = require('http'); // khởi tạo http chạy server
const routes = require("./routes") ; 
const express = require("express") ;
const { Console } = require('console');


const app = express() ; // cài đặt express = npm install --save express 
// xem phiên bản tại package.json 
// const express = require("express") ; 
// sử dụng express như 1 hàm ; tạo 1 biến app mới chứa express : 
// thiết lập server cho express đó 

const server1 = http.createServer(app) ; // tạo 1 
// const server = http.createServer(routes.handler) ; 
app.use((req, res, next)=>{
    console.log("-In the first middleware  have builed by use()") ; 
    next() ; 
});

app.use((req, res ,next)=>{
    console.log("-The second middleware have builed by use()") ; 
});

// server.listen(3000); 
server1.listen(3000); 
