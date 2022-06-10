const express = require('express') ; 
const router = express.Router(); 
const path = require('path');
const rootDir = require('../util/path');
const adminData = require('./admin');

router.get('/',(req, res , next)=>{
    
    // res.sendFile(path.join(rootDir,'views','shop.html')); 
    const products = adminData.products ; 
    res.render('shop', {prods: products, titlepage: 'New TITLE PAGE'}); 
});
module.exports = router ; 