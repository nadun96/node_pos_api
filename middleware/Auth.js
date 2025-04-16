const jwt = require("jsonwebtoken");
const User = require("../model/User");

const verifyToken = (requiredRoles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];

      if (!token) {
        return res.status(403).json({ message: "Access Denied , No Token" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;

      const user = await User.findOne({ name: decoded.name });

      if (!user) {
        return res.status(403).json({ message: "Access Denied , No User" });
      }

      // Check if the user has the required role
      if (requiredRoles.length > 0 && !requiredRoles.includes(user.roles)) {
        return res
          .status(403)
          .json({ message: "Access Denied , No Permission" });
      }
    } catch {
      if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid Token" });
      } else if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token Expired" });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

module.exports = verifyToken;
