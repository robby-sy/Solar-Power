const router = require("express").Router();
const userRouter = require("./user");
const projectRouter = require("./project");
const errorHandler = require("../middlewares/errorHandler");

router
  .use(userRouter)
  .use("/projects", projectRouter)
  .use(errorHandler);

module.exports = router;
