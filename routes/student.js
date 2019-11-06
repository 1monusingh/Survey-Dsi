const express = require('express');
const studentController = require('../controllers/student');


const router = express.Router();





router.get('/register',studentController.registerpage);
router.post('/register',studentController.register);
router.get('/login',studentController.loginpage);
router.post('/login',studentController.register);
// router.post('/login',authController.auth);
// router.post('/token',authController.getToken);
// router.post('/profile',authController.getProfile);
// router.post('/otherprofile',authController.getOtherProfile);
// router.post('/profile/update',authController.updateProfile);


module.exports = router;