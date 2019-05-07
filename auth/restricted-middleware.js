const bcrypt = require('bcryptjs')

const Users = require('../users/users-model')

module.exports = (req, res, next) => {
    const { username, password } = req.headers;

    if (req.session && req.session.id) {
        next();
    } else {
        res.status(401).json({
            message: "Invalid credentials"
        })
    }
}

