const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {

  MongoClient.connect('mongodb+srv://Chinh:zalo12345@cluster0.6jf9u.mongodb.net/?retryWrites=true&w=majority')
    .then(client => {
      console.log('Connected with mongodb!!!');
      callback(client);
    })
    .catch(err => {
      console.log(err);
    })
}

module.exports = mongoConnect; 