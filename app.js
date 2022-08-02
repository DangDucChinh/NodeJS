const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session') ; 
const errorController = require('./controllers/error');
const User = require('./models/user');
const MongoDBStore = require('connect-mongodb-session')(session) ; // session từ require('express-session') ; 




const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRouter = require('./routes/auth');

const store = new MongoDBStore({
  uri : 'mongodb+srv://Chinh:zalo12345@cluster0.6jf9u.mongodb.net/test' , 
  collection : 'sessions'
}); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret:'my secret', 
    resave: false, 
    saveUninitialized: false , 
    store: store})  // store tạo từ new MonfgooStore kết nối mongodp và mongodb compass 
 ) ; // , cookie : { maxAge , exprired ...}

app.use((req, res, next) => {
  User.findById('62ce57e031d8ee59e14c6a64')
    .then(user => {
      req.user = user; // gán req.user bằng user nạp dc ( hoặc tìm đc từ databse )
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRouter) ; 

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://Chinh:zalo12345@cluster0.6jf9u.mongodb.net/test'
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Max',
          email: 'max@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
