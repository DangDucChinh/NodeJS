const User = require('../models/user');
const bcryptjs = require('bcryptjs');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  // User.findById('5bab316ce0a7c75f783cb8a8')
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then(user_on_data => {
    if (!user_on_data) {
      // console.log('Ko có user đó !!');
      return res.redirect('/login');
    }

    bcryptjs.compare(password, user_on_data.password) // hàm so sánh hai giá trị băm
      .then(result_compare => { // chỉ nhận true hoặc false
        if (result_compare) {
        // console.log('MK Khớp ');

          req.session.isLoggedIn = true;
          req.session.user = user_on_data; // tạo phiên user bằng user_data , tức phiên mới này sử dụng cookie của user_on_data
          // như vậy sẽ lấy ra được người dùng đã đăng kí để đăng nhập 
          return req.session.save(err => {
            console.log(err);
            res.redirect('/'); // tạo phiên mới rồi , nếu có lỗi trong việc tạo phiên thì in ra lỗi và chuyển hướng về index do đã xác 
            // thực được email và mk 
          });
        }


        res.redirect('/login');
      })
  })
  .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) { // nếu user tồn tại trong database rồi thì yêu cầu sign up ( đăng kí ) lại 
        // alert('Đã tồn tại user này rồi , đề nghị đăng kí user khác !!!');  
        return res.redirect('/signup');
      }

      return bcryptjs.hash(password, 12)
        .then(hashedPassword => {
          // console.log(hashedPassword);
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/login'); // sau khi đăng kí cần phải đăng nhập  , đăng nhập chuẩn thì mới được dùng các tiện ích của người đăng nhập
        })
    })
    .catch(err => {
      console.log(err);
    })

};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
