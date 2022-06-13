const express = require('express') ; // tạo ra express
const router = express.Router() ;  
const path = require('path');
const rootDir = require('../util/path'); // rootDir : thư mục gốc
const products = [];

router.get('/add-product',(req, res , next)=>{
    res.render('add-product',{
        pageTitle: "GET ADD-PRODUCT BY PUG",
        path: '/admin/add-product',
        activeAddProduct: true ,
        formCSS: true , 
    }); // muon render thi phai có PUG o views
});

router.post('/add-product',(req, res , next)=>{
    products.push({title: req.body.title, name: req.body.name});
    res.redirect('/');
});

exports.router = router ;
exports.products = products ; 
// module.exports = router ; 


/*
/là gốc của ổ đĩa hiện tại;
./là thư mục hiện tại;
../là cha của thư mục hiện tại.

*/