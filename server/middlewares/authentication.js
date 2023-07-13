const { User, Project } = require("../models");
const { verifyToken } = require("../helpers/jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    console.log("masuk ke authentication kok");
    const { access_token } = req.headers;
    const payload = verifyToken(access_token);
    const { id } = payload;
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) throw { name: "unauthentication" };
    req.user = user;
    next();
  } catch (error) {
    let message = "";
    let code = 0;
    switch (error.name) {
      case "JsonWebTokenError":
      case "unauthentication":
        message = "unauthentication";
        code = 401;
        break;

      default:
        message = "internal server error";
        code = 500;
        break;
    }
    res.status(code).json({ msg: message });
  }
};
