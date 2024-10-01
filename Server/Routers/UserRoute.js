const express = require('express');
const router = express.Router();

const UserConantroller = require('../Controller/UserController');

const isAuthenticated = require('../Middleware/isAuthenticated');

router.post('/sign-in',UserConantroller.sign_in);

router.post('/registartion',UserConantroller.registartion);

router.get('/getUserData',UserConantroller.getUserData);

router.get("/", isAuthenticated , UserConantroller.allUsers);


module.exports = router;
