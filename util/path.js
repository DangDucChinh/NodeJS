const path = require('path');
module.exports = path.dirname(require.main.filename);
// => Mục đích của chỗ này là lấy ra được thư mục gốc và thay thế cho : __dirname , '../' ở phần bên dưới
// res.sendFile(path.join(__dirname, '../','views','add-product.html'));

// path.dirname : lấy ra tên thư mục

// process : biến toàn cục , có mặt ở mọi nơi

