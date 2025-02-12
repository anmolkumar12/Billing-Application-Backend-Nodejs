const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  if (!req.header("Authorization")) {
    return res.status(401).json({ statusCode:401,message: "No token, authorization denied" });
  }
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ statusCode:401,message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ statusCode:401 ,message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
