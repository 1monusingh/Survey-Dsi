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
router.get('/viewsurvey',surveyController.viewsurvey);    
router.post('/morequestions',surveyController.morequestions);    
router.post('/deletequestion',surveyController.deletequestion); 
router.get('/viewresult',surveyController.viewresult); 
router.get('/',techerController.gethome);




module.exports = router;