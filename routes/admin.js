const express = require('express'); // tạo ra express
const router = express.Router();
const path = require('path');
const productsController = require('../controllers/products');
router.get('/add-product', productsController.getAddProduct); // ko gọi hàm mà chỉ đóng vai trò như truyền 
// đi cái đường dẫn ( tham chiếu ) tới

router.post('/add-product', productsController.postAddProduct);

// exports.router = router ;
module.exports = router;


/*
/là gốc của ổ đĩa hiện tại;
./là thư mục hiện tại;
../là cha của thư mục hiện tại.

*/