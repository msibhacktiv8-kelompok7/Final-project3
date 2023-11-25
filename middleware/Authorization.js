async function Authorization(req, res, next) {
    try {
        const user = req.user;
        if (user.role != 'admin') {
            return res.status(401).json({ message: "UnAuthorized" });
        }

        next();
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({ message: "Internal server Error" });
    }
}

module.exports = Authorization;