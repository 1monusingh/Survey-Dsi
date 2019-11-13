const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const surveySchema = new Schema({
      
      surveyname:{type:String,required:true,},
      questions:[{type:Schema.Types.ObjectId,ref:'Question'}],
      section:{type:String},
      sem:{type:Number}
      }
);

 

module.exports = mongoose.model('Survey',surveySchema);