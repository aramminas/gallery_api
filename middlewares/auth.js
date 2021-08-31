require('dotenv').config();
const secret = process.env.TOKEN_SECRET;
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    if (!req.headers.authorization){
        return res.status(401).json({ error: 'No token provided.' });
    }

    const token = req.headers.authorization.split(" ");

    jwt.verify(token[0], secret,(err, data) => {

        if(err){
            return  res.status(401).json({error: 'Token is expired.'});
        }

        req.user = {id : data.id};
        next();
    });
}

module.exports = auth;