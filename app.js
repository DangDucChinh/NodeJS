const express = require("express") ;
const parseBody = require('body-parser') ; // thứ 1 : tạo parseBody bằng npm install --save parser-body ??
const path = require('path');
const app = express() ;

// cấu hình cho app
app.set('view engine','ejs'); 
app.set('views','views');


//import các phần của app
const adminRoutes = require('./routes/admin') ;
const shopRouter = require('./routes/shop');
const loginRouter = require('./routes/login');
const errorController = require('./controllers/error');


app.use(parseBody.urlencoded({extended: false})) ;  // đây là 1 middleware , chịu trách nhiệm xử lí data từ req ??
app.use(express.static(path.join(__dirname, 'public'))); 


// Các router chịu trách nhiệm điều hướng cho router 
app.use('/admin',adminRoutes);
app.use(shopRouter) ; 
app.use('/login',loginRouter) ; 


app.use(errorController.get404Page); 



app.listen(3000) ; 