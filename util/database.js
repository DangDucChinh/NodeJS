const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;


let _db ; 
const mongoConnect = callback => {

  MongoClient.connect('mongodb+srv://Chinh:zalo12345@cluster0.6jf9u.mongodb.net/?retryWrites=true&w=majority')
    .then(client => {
      console.log('Connected with mongodb!!!');
      _db = client.db(); // ten database
      callback();

    })
    .catch(err => {
      console.log(err);
      throw err ; 
    })
};



const getDb = ()=>{
  if(_db){
    return _db ; 
  }
  throw 'No database found !!!' ; 
}


exports.mongoConnect = mongoConnect ; 
exports.getDb = getDb ; 