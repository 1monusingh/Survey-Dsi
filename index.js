const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const bodyParser = require('body-parser');
const path = require('path');
const cookiiParser = require('cookie-parser')

// const userRoutes = require('./routes/user');

const teacherRoute = require('./routes/teacher');
const studentRoute = require('./routes/student');

const app = express();

app.set('views', 'views');
app.set('view engine', 'ejs');



mongoose.set('useCreateIndex', true);
mongoose.connect(config.URI).then(() => {

});



// app.use(express.static('views'));
app.use(express.static(path.join(__dirname, 'views')));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookiiParser());

app.use('/teacher',teacherRoute);
app.use('/student',studentRoute);

app.get('',function(req,res){
    res.redirect('/teacher/login');
})

var port = process.env.PORT || 5000;



app.listen(port, function () {
    console.log("Server listening on port v: " + port);
});