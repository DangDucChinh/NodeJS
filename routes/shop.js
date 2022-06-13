const express = require('express') ; 
const router = express.Router(); 
const path = require('path');
const rootDir = require('../util/path');


const adminData = require('./admin'); // lấy data từ admin.js ( ở đó có form và có products[n])
const loginData = require('./login'); // lấy data từ login.js ( ở đó có form login có 2 input : name and email)
router.get('/',(req, res , next)=>{
    
    // res.sendFile(path.join(rootDir,'views','shop.html')); 
    const products = adminData.products ;  // nhận products từ request POST (1)
    res.render('shop', {
        log: loginData.datalogin, // hoặc cũng có thể sử dụng trực tiếp như ở đây (2)
        hasLogindata: loginData.datalogin.length > 0 , // tức mảng datalogin > 0 
        prods: products,
        titlepage: 'New TITLE PAGE' , 
        path: '/' , 
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
    });  /// thực hiện render ra nội dung động để
    // truyền tải dữ liệu qua prods , trong prods được gán bằng request body
    // thì nhận được title và name ( là 2 input )

    // còn việc render ra ngoài là việc khác
});
module.exports = router ; 