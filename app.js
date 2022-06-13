const express = require("express") ;
const parseBody = require('body-parser') ; // thứ 1 : tạo parseBody bằng npm install --save parser-body ??
const path = require('path');
const rootDir = require('./util/path');
const app = express() ;


app.set('view engine','ejs'); 
app.set('views','views');

const adminRoutes = require('./routes/admin') ;
const shopRouter = require('./routes/shop');
const loginRouter = require('./routes/login');


app.use(parseBody.urlencoded({extended: false})) ;  // đây là 1 middleware , chịu trách nhiệm xử lí data từ req ??

app.use(express.static(path.join(__dirname, 'public'))); 
// Các router chịu trách nhiệm điều hướng cho router 
app.use('/admin',adminRoutes);
app.use(shopRouter) ; 
app.use('/login',loginRouter) ; 


app.use('/',(req, res, next)=>{  // xử lí tất cả đường dẫn lỗi 
    res.status(404) ; 
    res.render('404', {
        pageTitle: 'PAGE HANDLE BARS ',
        FF404CSS: true ,
    } ) ;
});

app.listen(3000) ; 