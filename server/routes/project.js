const router = require("express").Router();
const { C_Project } = require("../controllers/index");
const authentication = require('../middlewares/authentication')

router.post("/",authentication,C_Project.createProject);
router.put('/:id',authentication,C_Project.updateProject)
router.get('/',C_Project.getProjects)
router.get('/:id/:date',C_Project.getProject)

module.exports = router;
