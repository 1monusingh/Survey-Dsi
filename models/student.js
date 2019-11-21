const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
      
      name:{type:String,required:true,max:[30,"Name too long"]},
      email:{type:String,required:true,max:[30,"Email too long"] },
      password:{type:String,required:true},
      sec:{type:String},
      sem:{type:Number}
      }     

);

 

module.exports = mongoose.model('Student',studentSchema);