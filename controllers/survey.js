const Survey = require('../models/survey');
const Question = require('../models/questions');

module.exports.newsurevey = function(req,res){
 
   var  {name,sem,sec} = req.body;

   if(!name|| !sec||!sem){
        return res.render('new-survey');
    
   }
    console.log('new survey created')
   var mysurvey = new Survey({name,sec,sem});

      mysurvey.save();
     return res.render('addquestion',{
         name:name,
         id:mysurvey.id,
         count:1
     });

}
module.exports.addquestion = function(req,res){


    var {question,a1,a2,a3,a4,id,name,count} = req.body;
    var question = new Question({question,a1,a2,a3,a4});
       
    //   console.log(id);
    Survey.findOne({_id:id},function(err,found){
       
        // console.log(found);
        found.questions.push(question.id);
        question.save();
         found.save();
          
    }) ;
    res.render('addquestion',{
        name:name,
        id:id,
        count:""
    });

 

}

module.exports.viewsurvey = function(req,res){

     
    var { surveyid } =  req.body;

    Survey.findOne({_id:surveyid},function(err,found){

       if(!found){
          return  res.send("Try again");
       }
         
          Question.find({_id: {"$in": found.questions }},function(err,foundQuestions){
            //   console.log(foundQuestions);
              res.render('view-survey',{
                surveyname:found.name,
                questionlist: foundQuestions
            });
            
          })
        
          

    })

}