const jwt = require('jsonwebtoken');
const secret = 'secret123';
const authenticateUser = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                // invalid token
                res.redirect('/');
            } else {
                // user is authenticated
                req.user = decoded;
                next();
            }
        });
    } else {
        // no token found
        res.redirect('/');
    }
};

module.exports = { authenticateUser };