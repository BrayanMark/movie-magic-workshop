const jwt = require("../util/jwt");
const { SECRET } = require("../config/config");

exports.auth = async (req, res, next) => {
    // get token
    const token = req.cookies["auth"];

    // validate token
    if (!token) {
        return next();
    }

    try {
        const decodedToken = await jwt.verify(token, SECRET);

        req.user = decodedToken;
        res.locals.isAuthenticated = true;
        
        next();
    } catch {
        res.clearCookie("auth");
        res.redirect("/auth/login");
    }
}

exports.isAuth = (req, res, next) => {

    if (!req.user) {
       return res.redirect("/auth/login");
    }

    next();
}