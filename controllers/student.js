const Student = require('../models/student');
const Survey = require('../models/survey');
const Question = require('../models/questions');
const Result = require('../models/result');

module.exports.registerpage = function(req,res){
    //  res.send("aesrdg");
   res.render('student-register');
}

module.exports.loginpage = function(req,res){
//  res.send("aesrdg");
res.render('student-login');
}
module.exports.register = function(req,res){
    const { name, email, password, confirmpass,sem,sec } = req.body;
    
    if (password != confirmpass) {
        res.redirect('/student/register');
    }
    var newStudent = new Student(
        {
            name,
            email,
            password,
            sem,
            sec
        }
    );
    // console.log(newStudent);
    // console.log(newTeach);
    newStudent.save(function (err) {
        if (err) {
            return res.send('its an error');

        }
        console.log("success");
    });

    // console.log(name);
    return res.redirect('/student/login');
}


module.exports.login = function(req,res){
    var { email, password } = req.body;
    // console.log(req.body)
    if (!email || !password) {
        return res.redirect('/student/login')
    }
    Student.findOne({ email: email }, function (err, foundUser) {
        if (err || !foundUser) {

            return res.redirect('/student/login');
        }
        if (foundUser.password == password) {
            // console.log(foundUser);
            res.cookie("student", foundUser);
            return res.redirect('/student');
        }else{
            return res.redirect('/student/login'); 
        }

    });

    console.log(email + " :  " + password);

}

module.exports.getHome = function(req,res){
  
    var stored = req.cookies.student;
//   console.log(stored);

       Survey.find({sem:stored.sem,sec:stored.sec},function(err,foundSurveys)
       {
               if(err){
                   res.send("something went wrong , please try again");

               }
                // console.log(foundSurveys);
                res.render('student',{
                    name:stored.name,
                    surveys:foundSurveys
                });
            
       })


 


}



module.exports.logmeout = function(req,res){

    res.clearCookie();
    return res.redirect('/student/login');
}


module.exports.viewsurvey = function(req,res){
     
    var surveyid = req.query.surveyid;

    Survey.findOne({_id:surveyid},function(err,foundSurvey){
                 if(err)
                 {
                     res.send("please try again");
                 }
            var questions = foundSurvey.questions;
            
            Question.find({_id:{$in:questions}},function(err,foundQuestion){
                res.render('student-survey',{
                    questionlist:foundQuestion,
                    surveyid:surveyid
                })
            })
            
                  

    })
//    res.send('djhfgk')
}

module.exports.submitsurvey = function(req,res){
 
      var {surveyid,count} = req.body;
      var answers = [];
      var temp;
      const values = Object.values(req.body);
    //   console.log(values);
      for(i=1;i<=count;++i){
        temp = values[i];
        answers.push(temp);
       
      }
         
    var newresult = new Result({
        surveyid,
        answers
    });  
    // console.log(newresult);

    newresult.save();

    return res.redirect('/student');
    //    console.log(answers);

    //   console.log(count);
    
}