const jwt = require("jsonwebtoken");

module.exports = {
  validateToken: (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    let result;
    if (authorizationHeader) {
      const token = req.headers.authorization.split(" ")[1];
      const options = {
        expiresIn: "2d",
      };

      try {
        result = jwt.verify(token, process.env.JWT_SECRET, options);
        req.decode = result;
        next();
      } catch (error) {
        throw new Error(error);
      }
    } else {
      result = {
        error: `Authentication error. Token required.`,
      };
      res.send(result);
    }
  },
};
