const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        console.log("Auth Header:", authHeader);

        if (!authHeader) {
            return res.status(404).json({ message: "Token Required", data: null });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(404).json({ message: "Token Missing", data: null });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log('DECODED USER', decoded);

        req.user = decoded;

        next();

    } catch (error) {
        console.log('Error In Auth Middleware.', error);

        return res.status(500).json({ message: 'Error In Auth Middleware.', error: error.message });
    }
};

module.exports = authMiddleware;