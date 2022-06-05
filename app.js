const http = require('http'); // khởi tạo http chạy server
const routes = require("./routes") ; 
const express = require("express") ;


const app = express() ; // cài đặt express = npm install --save express 
// xem phiên bản tại package.json 
// const express = require("express") ; 
// sử dụng express như 1 hàm ; tạo 1 biến app mới chứa express : 
// thiết lập server cho express đó 

const server1 = http.createServer(app) ; // tạo 1 
const server = http.createServer(routes.handler) ; 


server.listen(3000); 