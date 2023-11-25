const { verifyToken } = require("../utils");

async function Authentication(req, res, next) {
    try {
        const token = req.headers.token;
   
        if (!token) {
            return res.status(400).json({ message: "Token tidak valid" });
        }

        const user = verifyToken(token);
        
        req.user = user;
        next()
    } catch (e) {
        if (e.name == 'JsonWebTokenError') {
            console.error("Error :", e);
            return res.status(400).json("Token Tidak Valid1");
        }
        console.error("Error :", e.message);
        return res.status(500).json("Internal Server error");
    }
}


module.exports = Authentication;