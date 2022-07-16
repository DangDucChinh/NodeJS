// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// const ObjectId = mongodb.ObjectId;

// class User {
//   constructor(username, email, cart, id) {
//     this.name = username;
//     this.email = email;
//     this.cart = cart; // {items: []}
//     this._id = id;
//   }

//   save() {
//     const db = getDb();
//     return db.collection('users').insertOne(this);
//   }

//   addToCart(product) {
//     const cartProductIndex = this.cart.items.findIndex(cp => { // B1 : Tìm index product
//       return cp.productId.toString() === product._id.toString();
//     });
//     console.log("\n\n=> : " + cartProductIndex);
//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items];  // B2 :  sao chép toàn bộ mảng items
//     // this.cart.items.forEach(()=>{}) ; 
//     // updatedCartItems.forEach((element , index) => {
//     //   console.log("\n\n =>>>>> : " + element.productId.toString() + " -- " + index) ; 
//     // });

//     if (cartProductIndex >= 0) { // B3 : nếu sản phẩm có ở items giỏ hàng , cập nhật số lượng và ném vào số lượng của items khi đã đc tăng xong
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {  //B3 : Nếu ko có sẳn phẩm trong cart , mảng items mới đó push sản phẩm vào , số lượng bằng 1 
//       updatedCartItems.push({
//         productId: new ObjectId(product._id),
//         quantity: newQuantity
//       });
//     }
//     const updatedCart = {
//       items: updatedCartItems
//     };  // B4 : Hoàn thành cartUpdate 
//     const db = getDb();
//     return db
//       .collection('users')
//       .updateOne(  // B5 : Update Cart 
//         { _id: new ObjectId(this._id) },
//         { $set: { cart: updatedCart } }
//       );
//   }
//   getCart() {
//     const db = getDb();
//     const productIds = this.cart.items.map(i => {
//       return i.productId;
//     });
//     return db
//       .collection('products')
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then(products => {
//         return products.map(p => {
//           return {  // 1
//             ...p,
//             quantity: this.cart.items.find(i => {
//               return i.productId.toString() === p._id.toString(); // items nào có productId =  _id của lớp products
//             }).quantity
//           };  //4  : 1-4 tạo 1 đối tượng mới , và đối tượng này là 1 mảng products
//           // mới toanh chứa thêm cả thuộc tính quantity nữa ; 
//         })
//       });
//   }

//   deleteItemFromCart(productId) { // truyền vào id sp muốn xóa 
//     const updatedCartItems = this.cart.items.filter(item => {
//       return item.productId.toString() !== productId.toString();
//     }); // lọc ra mảng mà ko có productId đó 
//     const db = getDb();
//     return db
//       .collection('users') // tiến hành update collection user ( items) trở về với ko 
//       // có sản phẩm đó . 
//       .updateOne(
//         { _id: new ObjectId(this._id) },
//         { $set: { cart: { items: updatedCartItems } } }
//       );
//   }

//   addOrder() {
//     const db = getDb();
//     return this.getCart()
//       .then(products => {
//         const order = {
//           items: products,
//           user: {
//             _id: new ObjectId(this._id),
//             name: this.name
//           }
//         };
//         return db.collection('orders').insertOne(order);
//       })
//       .then(result => {
//         this.cart = { items: [] };
//         return db
//           .collection('users')
//           .updateOne(
//             { _id: new ObjectId(this._id) },
//             { $set: { cart: { items: [] } } }
//           );
//       });
//   }

//   getOrders() {
//     const db = getDb();
//     return db
//       .collection('orders')
//       .find({ 'user._id': new ObjectId(this._id) })
//       .toArray();
//   }

//   static findById(userId) {
//     const db = getDb();
//     return db
//       .collection('users')
//       .findOne({ _id: new ObjectId(userId) })
//       .then(user => {
//         console.log(user);
//         return user;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// }

// module.exports = User;


const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        productId: { type: Schema.Types.ObjectId, required: true },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

module.exports = mongoose.model('User', userSchema);