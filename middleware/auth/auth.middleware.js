const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Token Required", data: null });
        }

        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

        if (!token) {
            return res.status(401).json({ message: "Token Missing", data: null });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { userId, role, roleId }
        next();

    } catch (error) {
        return res.status(401).json({ message: 'Invalid or Expired Token.', error: error.message });
    }
};

const roleMiddleware = (...allowedRole) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication Required.', data: null });
        }

        if (!allowedRole.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access Denied.', data: null });
        }

        next();
    };
};

module.exports = { authMiddleware, roleMiddleware };