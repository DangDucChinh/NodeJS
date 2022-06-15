const Product = require('../models/product');
const logins = []; 

exports.getAddProduct = (req, res , next)=>{
    res.render('add-product',{
        pageTitle: "GET ADD-PRODUCT",
        path: '/admin/add-product',
        activeAddProduct: true ,
        formCSS: true , 
    })
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title, req.body.name) ; 
    console.log(product.title + ' / ' + product.name) ; 
    product.save();
    res.redirect('/');
}

//=> Lấy ra sản phẩm và LOGIN
exports.getProducts = (req, res , next)=>{
    Product.fetchAll(products => {
        res.render('shop', {
            log: [], // hoặc cũng có thể sử dụng trực tiếp như ở đây (2)
            // hasLogindata: logins.length > 0 , // tức mảng datalogin > 0 
            hasLogindata : false ,
            prods: products,
            hasProducts: products.length > 0,
            pageTitle: 'New TITLE PAGE' , 
            path: '/' , 
            activeShop: true,
            productCSS: true,
        }); 
    }) ;
}


exports.getAddLogin = (req, res , next)=>{
    res.render('login', { // login ở đây là login.ejs chứ ko phải là đường dẫn
        pageTitle: 'This is new page' , // 
        path: '/login/login-add-data',
        loginCSS: true , 
        activeLogin: true, 
    });
}
exports.postAddLogin = (req, res , next)=>{
    logins.push({
        name: req.body.name,
        email: req.body.email
    });
    res.redirect('/');
}