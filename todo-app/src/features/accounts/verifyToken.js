// import jwt from "jsonwebtoken";
const jwt = require('jsonwebtoken');
const verifyUser = (req, res, next) => {
  console.log('Req.Headers: ', req.headers);
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];

  let user = null;
  try {
    user = jwt.verify(token, 'bearerToken_123');
    req.userId = user.userId; // Attach userid to req object
    next(); // Call next middleware
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' });
  }

  //return res.send({ message: authorization, user });
};

module.exports = verifyUser;
