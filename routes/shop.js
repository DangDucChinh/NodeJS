const express = require('express') ; 
const router = express.Router(); 
const path = require('path');
const rootDir = require('../util/path');
const adminData = require('./admin');

router.get('/',(req, res , next)=>{
    
    // res.sendFile(path.join(rootDir,'views','shop.html')); 
    const products = adminData.products ;  // nhận products từ request POST
    res.render('shop', {prods: products, titlepage: 'New TITLE PAGE' , path: '/' , hasProducts: products.length > 0});  /// thực hiện render ra nội dung động để
    // truyền tải dữ liệu qua prods , trong prods được gán bằng request body
    // thì nhận được title và name ( là 2 input )

    // còn việc render ra ngoài là việc khác
});
module.exports = router ; 