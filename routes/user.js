const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');

const userController = require('../controllers/user');

router.post('/signup', userController.signupUser);
router.post('/signin', userController.signinUser);
router.get('/current', isAuth, userController.getUser);
router.delete('/delete', isAuth, userController.deleteUser);

module.exports = router;