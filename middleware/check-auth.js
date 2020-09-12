const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies.X_AUTH;
    if(!token) return res.status(401).send("Access denied to unauthorized users.");

    try{
        const verified = jwt.verify(token, 'secret');
        req.user = verified;
        next();
    }
    catch(err){
        res.status(400).json({error: err})
    }
}