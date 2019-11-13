const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const surveySchema = new Schema({
      
      name:{type:String,required:true,},
      questions:[{type:Schema.Types.ObjectId,ref:'Question'}],
      sec:{type:String},
      sem:{type:Number}
      }
);

 

module.exports = mongoose.model('Survey',surveySchema);