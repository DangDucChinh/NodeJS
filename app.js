const http = require('http'); // khởi tạo http chạy server
const routes = require("./routes") ; 

const server = http.createServer(routes.requester) ;
console.log(routes.someText) ;  

server.listen(3000); 