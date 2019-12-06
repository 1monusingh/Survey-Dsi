const Survey = require('../models/survey');
const Question = require('../models/questions');
const Result = require('../models/result');


module.exports.newsurevey = function(req,res){
 
   var  {name,sem,sec} = req.body;

   if(!name|| !sec||!sem){
        return res.render('new-survey');
    
   }
   var stored = req.cookies.teacher;
//    console.log("hi"+stored.email);

    // console.log('new survey created')
   var mysurvey = new Survey({name,sec,sem,teacheremail:stored.email});

      mysurvey.save();
     return res.render('addquestion',{
         name:name,
         id:mysurvey.id,
         count:1,
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

     
    // var { surveyid } =  req.body;
    var surveyid = req.query.surveyid;

    Survey.findOne({_id:surveyid},function(err,found){

       if(!found){
          return  res.send("Try again");
       }
         
          Question.find({_id: {"$in": found.questions }},function(err,foundQuestions){
            //   console.log(foundQuestions);
              res.render('view-survey',{
                surveyname:found.name,
                questionlist: foundQuestions,
                surveyid:surveyid
            });
            
          })
        
          

    })

}

module.exports.morequestions = function(req,res){

      var id = req.body.surveyid;
    //   console.log(id);

    res.render('addquestion',{
        name:"",
        id:id,
        count:""
    });
}

module.exports.deletequestion = function(req,res){
     
     var{surveyid , questionid}  = req.body;
    //  console.log(surveyid+questionid);


    Survey.findOne({_id:surveyid},function(err,found){
        if(err){
            res.send("err"+err);
        }
        // console.log(found);
        var king = found.questions;
        var result = arrayRemove(king, questionid);
         found.questions = result;
         found.save();

    })
   
     
    res.redirect("/teacher/viewsurvey?surveyid="+surveyid);
}

function arrayRemove(arr, value) {

    return arr.filter(function(ele){
        return ele != value;
    });
 
 }

 module.exports.viewresult = function(req,res){

    var surveyid = req.query.surveyid;
    Survey.findOne({_id:surveyid},function(err,found){

        if(!found){
           return  res.send("Try again");
        }
          
           Question.find({_id: {"$in": found.questions }},function(err,foundQuestions){

             Result.find({surveyid:surveyid},function(err,foundResults){
                 var resultset = new Array(20);
                //  console.log(foundResults[0]);
                console.log(resultset);
                var one = foundResults[0].answers;
                // console.log(one);
                for(i= 0;i<20;i++)
                {       var what= 0;
                    //  console.log(i);
                     resultset[i] = what;
                }
                console.log(resultset);
                foundResults.forEach(answer =>{
                    
                     var two = answer.answers;
                    //  console.log(two);
                   
                    for(i= 1;i<=two.length;i++)
                    {
                       

                         if(two[i-1]==1){
                              resultset[i-1] =  resultset[i-1] +1 
                         }
                         if(two[i-1]==2){
                            resultset[i-1] =  resultset[i-1] +10 
                       }
                       if(two[i-1]==3){
                        resultset[i-1] =  resultset[i-1] +100 
                   }
                    
                   if(two[i-1]==4){
                    resultset[i-1] =  resultset[i-1] +1000 
               }
                         
                    }
                    // console.log(answer.answers);
                   
                });
               
                console.log(resultset);
                // console.log(answe);
                // console.log(foundQuestions);
                res.render('view-result',{
                  surveyname:found.name,
                  questionlist: foundQuestions,
                  surveyid:surveyid,
                  resultset:resultset
                //   answe:answe
              });

             })
               
             
           })
         
           
 
     })
    console.log(surveyid);
 }