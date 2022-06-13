const express = require('express');
const router = express.Router() ;  // tạo ra router
const path = require('path'); // tính toán đường dẫn
const datalogin = [] ; // khai báo mảng rỗng chứa dữ liệu login từ form ngoài 
const rootDir = require('../util/path'); // rootDir : thư mục gốc
router.get('/login-add-data', (req, res , next)=>{
    res.render('login', {
        titlePage: 'This is new page' , // 
        path: '/login/login-add-data',
        loginCSS: true , 
        activeLogin: true, 
    });
});
router.post('/login-add-data',(req, res , next)=>{
    datalogin.push({name: req.body.name, email: req.body.email});
    res.redirect('/');
});

 // xuất khẩu ra được biến dữ liệu để có thể used 
exports.router = router ;
exports.datalogin = datalogin ; 