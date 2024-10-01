const jwt = require('jsonwebtoken');

const User = require('../Model/User');

const isAuthenticated = async (req, res, next) => {
    const auth = req.headers['authorization']

    if(!auth){
        return res.status(403).json({ message: 'Unautherized user, Please Login', success: false });
    }

    try{
        const checkVerify = jwt.verify(auth, process.env.JWT_SECRET_KEY);
        const userDetails = await User.findById(checkVerify).select("-Password");
        req.user = userDetails;
        next();
    }catch(error){
        console.log('Error in JWT verification - ', error);
        return res.status(403).json({ message: 'Unautherized user, Please Login', success: false });
    }

}


module.exports = isAuthenticated;