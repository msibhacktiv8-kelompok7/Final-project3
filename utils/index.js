const { hashPassword, comparePassword } = require("./bcrypt");
const format = require("./formatTime");
const { generateToken, verifyToken } = require("./jsonwebtoken");




module.exports = {
    hashPassword,
    comparePassword,
    format,
    generateToken,
    verifyToken
}

