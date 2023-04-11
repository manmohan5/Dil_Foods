const jwt = require('jsonwebtoken');
const secret = 'your_secret_key'; // Replace with your secret key

function verifyToken(req, res, next) {
  // Get the token from the request header
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Unauthorized'); // No token provided

  // Verify the token
  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(401).send('Unauthorized'); // Invalid token
    req.user = decoded; // Save the decoded token in the request object for future use
    next();
  });
}
