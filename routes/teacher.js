const express = require('express');
const techerController = require('../controllers/teacher');
const surveyController = require('../controllers/survey');


const router = express.Router();




console.log('teacher-route');
router.get('/register',techerController.registerpage);
router.post('/register',techerController.register);
router.get('/login',techerController.loginpage);
router.post('/login',techerController.login);
router.get('/logout',techerController.logmeout);     
router.get('/create',techerController.createnew);        
router.post('/newsurvey',surveyController.newsurevey);        
router.post('/addquestion',surveyController.addquestion);      
router.post('/viewsurvey',surveyController.viewsurvey);    
router.get('/',techerController.gethome);




module.exports = router;