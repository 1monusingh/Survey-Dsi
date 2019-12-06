const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const resultSchema = new Schema({
      
       surveyid:{type:Schema.Types.ObjectId,ref:'Survey'},
       answers:[{type: Number}]
      
    }
      
);

 

module.exports = mongoose.model('Result',resultSchema);