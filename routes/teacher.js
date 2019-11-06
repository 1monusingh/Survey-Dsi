const express = require('express');
const techerController = require('../controllers/teacher');


const router = express.Router();




console.log('teacher-route');
router.get('/register',techerController.registerpage);
router.post('/register',techerController.register);
router.get('/login',techerController.loginpage);
router.post('/login',techerController.login);
router.get('/logout',techerController.logmeout);     
router.get('/create',techerController.createnew);        
router.get('/',techerController.gethome);




module.exports = router;