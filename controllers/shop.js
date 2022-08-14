const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');


const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      console.log(products);
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};


exports.getInvoice = (req, res, next) => {

  const orderId = req.params.orderId; // lấy id của order, tìm  order đó , truy ra userId , cái này ghi trong routes
  Order.findById(orderId)
    .then(order => {

      if (!order) {
        console.log('Ko thấy order');
        return next(new Error('No order found !!!'));
      }

      if (order.user.userId.toString() !== req.user._id.toString()) {
        return next(new Error('KO thể xác thực userid đang đăng nhập và orderid của người đang đăng nhập !!!'));
      }

      const invoiceName = 'invoice-' + orderId + '.pdf';
      const invoicePath = path.join('data', 'invoices', invoiceName); // module path cho phép chỉ thẳng vào đường dẫn để lấy được tên file
      const pdfdoc = new PDFDocument(); // pdfdoc là 1 luồng đọc nên có thể dùng pipe để viết thành luồng ghi

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Diposition', 'inline; filename="' + invoiceName + '" "');

      pdfdoc.pipe(fs.createWriteStream(invoicePath)); // tạo ra dữ liệu nhờ luồng ghi khi đọc
      pdfdoc.pipe(res); // luồng đọc pdfdoc chuyển thành luồng đọc có thể ghi res
      pdfdoc.text('Hello world\nHello world');

      pdf.end(); // khi gọi nó, bắt đầu từ luồng ghi pdfdocpipe(fs.createStream ...) để tạo tệp và gửi phẩn hồi sẽ bị đóng 
      res.send(data) // hàm cung cấp bởi express


      //1 fs.readFile(invoicePath, (err, data) => { // đọc xong tệp thì có callback để làm gì đó 
      //   if (err) {
      //     console.log(err);
      //     return next(err); // bỏ vào middleware xử lí lỗi lần trc , dùng return để mã khác ko dc thực thi
      //   }

      //   // nếu ko lỗi thì là cua tôi rồi . làm gì thì làm 
      // res.setHeader('Content-Type', 'application/pdf');
      // res.setHeader('Content-Diposition', 'inline; filename="' + invoiceName + '" "');
      // res.send(data) // hàm cung cấp bởi express
      // });

      //2 const file = fs.createReadStream(invoicePath) ; 
      // res.setHeader('Content-Type', 'application/pdf');
      // res.setHeader('Content-Diposition', 'inline; filename="' + invoiceName + '" "');
      // res.send(data) // hàm cung cấp bởi express

      // file.pipe(res) ; 
      // response là luồng ghi , vì vậy cần chuyển tiếp từ luồng đọc sang luồng ghi

    })
    .catch(err => { // nếu ko tìm ra
      console.log('Gặp lỗi trong việc truy cập vào Object Order !!!');
      return next(err);
    });
}