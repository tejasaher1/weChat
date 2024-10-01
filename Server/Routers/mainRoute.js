const express = require('express');
const router = express.Router();
const userRoutes = require('./UserRoute');
const chatRoutes = require('./chatRoutes');
const messageRoute = require("./messageRoute")

const isAuthenticated = require('../Middleware/isAuthenticated');

router.get('/isAuthenticatedCheck', isAuthenticated , (req, res) => {
    console.log(req.user);
    return res.status(200).json({message: 'User has correct credentials' ,success: true, userData: req.user});
});


router.use('/user', userRoutes);

router.use('/chat',isAuthenticated,  chatRoutes);

router.use('/message',isAuthenticated, messageRoute);



module.exports = router;




