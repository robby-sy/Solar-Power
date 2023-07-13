const router = require("express").Router();
const { C_User } = require("../controllers/index");
const errorHandler = require("../middlewares/errorHandler");

router.post("/login", C_User.login);
router.post("/register", C_User.register);
router.use(errorHandler);

module.exports = router;
