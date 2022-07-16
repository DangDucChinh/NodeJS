// const path = require('path');


// const express = require('express');
// const bodyParser = require('body-parser');

// const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
// const User = require('./models/user');
// const mongoose = require('mongoose');

// const app = express();

// app.set('view engine', 'ejs');
// app.set('views', 'views');

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

// // app.use((req, res, next) => {
// //   User.findById('62ce57e031d8ee59e14c6a64')
// //     .then(user => {
// //       req.user = new User(user.name, user.email, user.cart, user._id);
// //       next();
// //     })
// //     .catch(err => console.log(err));
// // });

// app.use('/admin', adminRoutes);
// app.use(shopRoutes);

// app.use(errorController.get404);

// // mongoConnect(() => {
// //   app.listen(3000);
// // });

// mongoose.connect('mongodb+srv://Huong:zalo12345@cluster0.3me2f.mongodb.net/shop')
// .then(result=>{
//   const user = new User({
//     name : 'Mongoose',
//     email : 'Mongoose@gmail.com' , 
//     cart : {
//       items : []
//     }
//   })
//   user.save() ; 
//   app.listen(3000);
// })
// .catch(err=>{
//   console.log(err) ; 
// })


const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById('5bab316ce0a7c75f783cb8a8')
//     .then(user => {
//       req.user = user;
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://Huong:zalo12345@cluster0.3me2f.mongodb.net/shop'
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Mongoose',
          email: 'Mongoose@gmail.com',
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
