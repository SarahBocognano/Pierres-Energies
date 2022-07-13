const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req,res,next) {
    const token = req.header('x-auth-token');

    // Check for token
    if(!token) {
        return res.status(400).json({message: 'No token available, authorization denied'})
    }

    try {
        // Vérification du token
        const decoded = jwt.verify(token, config.get('jwtsecret'));
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({message: 'Token is not valid'})
    }
}

module.exports = auth;