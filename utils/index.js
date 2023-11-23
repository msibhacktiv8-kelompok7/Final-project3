const { hashPassword, comparePassword } = require("./bcrypt");
const format = require("./formatTime")

module.exports = {
    hashPassword,
    comparePassword,
    format
}

