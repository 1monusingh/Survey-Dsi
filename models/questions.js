const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
      
      question:{type:String},
      a1:{type:String},
      a2:{type:String},
      a3:{type:String},
      a4:{type:String},
 
      }     

);

 

module.exports = mongoose.model('Question',questionSchema);