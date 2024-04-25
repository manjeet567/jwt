const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.createjwt = async (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '300000s' }, (err, token) => {
            if (err) {
                console.error('Error creating JWT:', err);
                reject(err);
            } else {
                console.log('JWT created successfully:', token);
                resolve(token);
            }
        });
    });
};


exports.verifyjwt = async (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.json({
            status: 401,
            message: 'Unauthorized: No token provided',
        });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            res.json({
                status: 401,
                message: 'Unauthorized: Invalid token',
            });
        } else {
            console.log('JWT verified successfully:', data);
            req.user = data;
            next();
        }
    });
};