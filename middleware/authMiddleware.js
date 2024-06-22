const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // extract the token from auth header
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token)
    return res.status(401).json({ error: "No token, authorization denied" });

  try {
    // verify if token is valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    // allow the request to proceed, if token is valid
    next();
  } catch (err) {
    res.status(401).json({ error: "Token is not valid" });
  }
};
