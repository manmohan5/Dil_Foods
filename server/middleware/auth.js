const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({
      message: "token not available",
    });
  jwt.verify(token, "foodlab", (err, user) => {
    if (err) return res.status(403).json({ message: "Unauthorize login" });
    req.user = user;
    next();
  });
}

function generateAccessToken(userName) {
  return (
    jwt.sign({ data: userName }),
    "foodlab",
    {
      expiresIn: "1h",
    }
  );
}

module.exports = {
  authenticateToken,
  generateAccessToken,
};
