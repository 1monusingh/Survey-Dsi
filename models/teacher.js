const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
      
      name:{type:String,required:true,max:[30,"Name too long"]},
      email:{type:String,required:true,max:[30,"Email too long"] },
      password:{type:String,required:true},
     
      }     

);

 

module.exports = mongoose.model('Teacher',teacherSchema);