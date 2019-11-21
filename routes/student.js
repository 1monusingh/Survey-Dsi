const express = require('express');
const studentController = require('../controllers/student');


const router = express.Router();





router.get('/register',studentController.registerpage);
router.post('/register',studentController.register);
router.get('/login',studentController.loginpage);
router.post('/login',studentController.login);
router.get('/logout',studentController.logmeout);
router.get('/viewsurvey',studentController.viewsurvey);
router.post('/submit',studentController.submitsurvey);
router.get('/',studentController.getHome);


module.exports = router;