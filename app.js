const path = require('path'); 

const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const mongoConnect = require('./util/database');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {// sequelize
  
});

// app.use('/admin', adminRoutes);
// app.use(shopRoutes);

// app.use(errorController.get404);

mongoConnect(client=>{
  app.listen(3000) ; 
})

