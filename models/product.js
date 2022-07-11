const { get } = require('../routes/admin');

const getDb = require('../util/database').getDb ; 



class Product{
  constructor(title, price, description, imageUrl){
    this.title = title ; 
    this.price = price ; 
    this.description = description ; 
    this.imageUrl = imageUrl ; 
  }

  save(){
    const db = getDb() ;
    db.collection('products') // muốn chèn gì đó vào collection nào ?
      .insertOne(this)  // insertOne({}) , insertMany([{},{}.{}]) ;  
      .then(result=>{
        console.log(result) ; 
      })
      .catch(err=>{
        console.log(err) ; 
        throw err ; 
      })
  }
}

module.exports = Product ; 
