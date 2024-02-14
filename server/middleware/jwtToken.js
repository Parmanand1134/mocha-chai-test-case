const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'] || req.body.token || req.query.token || req.headers['access-token'];

    if (!token) {
        return res.status(401).send({ error: 'No token provided' });
    }

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: 'Invalid token' });
        }
        req.userId = decoded.userId;
        next();
    });
};

module.exports = verifyToken;
