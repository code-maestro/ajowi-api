const { verify } = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const verifyToken = (req, res, next) => {

  const token = req.body.token || req.query.token || req.params.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {

    const decoded = verify(token, process.env.TOKEN_KEY);
    console.log(decoded.user.user_id);
    req.user = decoded;

  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  return next();

};

module.exports = verifyToken;