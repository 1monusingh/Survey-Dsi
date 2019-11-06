
const Teacher = require('../models/teacher');

module.exports.registerpage = function (req, res) {
    //  res.send("aesrdg");
    console.log('teacher-route');
    res.render('teacher-register');
}

module.exports.loginpage = function (req, res) {
    //  res.send("aesrdg");
    console.log('teacher-route');
    res.render('teacher-login');
}


module.exports.register = function (req, res) {
    const { name, email, password, confirmPassword } = req.body;
    console.log(req.body);
    if (password != confirmPassword) {
        res.redirect('/teacher/register');
    }
    var newTeach = new Teacher(
        {
            name,
            email,
            password
        }
    );
    // console.log(newTeach);
    newTeach.save(function (err) {
        if (err) {
            return res.send('its an error');

        }
        console.log("success");
    });

    console.log(name);
    return res.redirect('/teacher/login');
}


module.exports.login = function (req, res) {
    //  res.send("aesrdg");
    //    res.render('teacher-login');
    var { email, password } = req.body;
    if (!email || !password) {
        return res.redirect('/teacher/login')
    }
    Teacher.findOne({ email: email }, function (err, foundUser) {
        if (err || !foundUser) {

            return res.redirect('/teacher/login');
        }
        if (foundUser.password == password) {
            console.log(foundUser);
            res.cookie("teacher", foundUser);
            return res.redirect('/teacher');
        }else{
            return res.redirect('/teacher/login'); 
        }

    });

    console.log(email + " :  " + password);

    //   
}

module.exports.gethome = function (req, res) {


    console.log(req.cookies);
    var stored = req.cookies.teacher;

    res.render('teacher', {
        name: stored.name
    });


}
module.exports.logmeout = function(req,res){

    res.clearCookie('Teacher');
    return res.redirect('/teacher/login');
}

module.exports.createnew = function(req,res){

    return res.render('new-survey')
}