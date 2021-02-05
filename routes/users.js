const controller = require("../controllers/users");
const validateToken = require("../utils/validateToken").validateToken;

module.exports = (router) => {
  router.route("/users").post(controller.add).get(controller.getAllUsers);
  router.route("/login").post(controller.login);
};
