const express = require('express'); //1. tạo express
const router = express.Router() ;  // tạo ra router
const path = require('path'); // tính toán đường dẫn
const loginController = require('../controllers/products');


router.get('/login-add-data', loginController.getAddLogin);
router.post('/login-add-data', loginController.postAddLogin);

 // xuất khẩu ra được biến dữ liệu để có thể used 
// exports.router = router ;
// exports.datalogin = datalogin ; 
module.exports = router ; 