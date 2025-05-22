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

      console.log(decoded);

      const user = await User.findOne({ name: decoded.name });
      console.log(user);
      if (!user) {
        return res.status(403).json({ message: "Access Denied , No User" });
      }

      // Check if the user has the required role
      if (
        requiredRoles.length > 0 &&
        !requiredRoles.some((role) => user.roles.includes(role))
      ) {
        return res
          .status(403)
          .json({ message: "Access Denied , No Permission" });
      }

      next();
    } catch (err) {
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
