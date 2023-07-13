const { User, Project, Record } = require("../models");
module.exports = {
  updateProjectAutho: async (req, res, next) => {
    try {
      const { id: ProjectId } = req.params;
      const project = await Project.findByPk(ProjectId);
      if (!project) throw new E();
    } catch (error) {}
  },
};
