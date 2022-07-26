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
      console.log(err);
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
    .catch(err => console.log(err));
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
      console.log(err);
    });
};


exports.getCart = (req, res, next) => {
  req.user
    // .getCart()
    .populate('cart.items.productId') // lấy ra các phần tử product được do đã chọc ref trong cấu trúc Model 
    // populate ko phải là 1 promise nên then() ko có tác dụng , cần thêm execPopulate() thì mới có cấu trúc promise
    .execPopulate()
    .then(products => {

      // console.log(products.cart.items[0].quantity) ; 
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products.cart.items
      });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      // console.log(req.user) ; 
      return req.user.addToCart(product); // trả lại kết quả của thằng sau return , lấy kết quả đó dùng ở then kế tiếp 
    })
    .then(result => {
      // console.log(result) ; 
      res.redirect('/cart');
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {

  req.user.populate('cart.items.productId')
  .execPopulate()
    .then(user => {
      console.log(user.cart.items)
      const products = user.cart.items.map(i => {
        return {
          quantity: i.quantity,
          product: {...i.productId._doc} 
        };
      });

      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result=>{
      return req.user.clearCart() ; 
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
}

exports.getOrders = (req, res, next) => {
  req.users
    .getOrders().execPopulate()
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};
