const { User, Project, Record, sequelize } = require("../models");
const { signToken } = require("../helpers/jsonwebtoken");
const { Op } = require("sequelize");

class C_Project {
  static async createProject(req, res, next) {
    try {
      console.log("masuk controller kok");
      const { id: UserId } = req.user;
      const {
        name,
        picture1,
        picture2,
        picture3,
        longitude,
        latitude,
        description,
        location,
        power,
      } = req.body;
      await Project.create({
        name,
        UserId,
        picture1,
        picture2,
        picture3,
        longitude,
        latitude,
        description,
        location,
        power,
      });
      res.status(201).json({ msg: "project successfully created" });
    } catch (error) {
      next(error);
    }
  }

  static async updateProject(req, res, next) {
    try {
      const { id } = req.params;
      const {
        name,
        picture1,
        picture2,
        picture3,
        longitude,
        latitude,
        description,
      } = req.body;
      await Project.update(
        {
          name,
          picture1,
          picture2,
          picture3,
          longitude,
          latitude,
          description,
        },
        {
          where: { id },
        }
      );
      res.send("success update");
    } catch (error) {
      res.send(error);
    }
  }

  static async getProjects(req, res, next) {
    try {
      const projects = await Project.findAll({
        limit: 6,
        attributes: [
          "name",
          "location",
          "id",
          "description",
          "location",
          "power",
          "picture1",
          "picture2",
          "picture3",
          "latitude",
          "longitude",
        ],
        include: [
          {
            model: User,
            attributes: ["username", "id", "profile_picture"],
          },
          {
            model: Record,
            attributes: [
              "id",
              "createdAt",
              "voltage",
              "current",
              "intensity",
              "humidity",
              "temperature",
            ],
            where : sequelize.literal(`"Records"."createdAt" >= (select max("createdAt"::date) from "Records" )`),
          },
        ],
      });
      res.status(200).json(projects);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getProject(req, res, next) {
    try {
      const { id, date } = req.params;
      let options = {
        attributes: [
          "name",
          "location",
          "id",
          "description",
          "location",
          "power",
          "picture1",
          "picture2",
          "picture3",
          "latitude",
          "longitude",
        ],
        include: [
          {
            model: User,
            attributes: ["username", "id", "profile_picture"],
          },
          {
            model: Record,
            attributes: [
              "id",
              "createdAt",
              "voltage",
              "current",
              "intensity",
              "humidity",
              "temperature",
            ],
          },
        ],
      };
      if (date==="latest") {
        options.include[1].where = sequelize.literal(`"Records"."createdAt" >= (select max("createdAt"::date) from "Records" )`)
      } else {
        let tgl = new Date(date);
        options.include[1].where = {
          createdAt: {
            [Op.gte]: new Date(tgl),
            [Op.lt]: new Date(tgl.setDate(tgl.getDate() + 1)),
          },
        };
      }
      const project = await Project.findByPk(id, options);
      if (!project) res.status(400).json({msg:'record not exist'})
      res.status(200).json(project);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}


class C_User {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "bad request", message: "email is required" };
      if (!password)
        throw { name: "bad request", message: "password is required" };
      let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
      if (!regex.test(email))
        throw { name: "bad request", message: "invalid email format" };
      const user = await User.findOne({
        where: { email },
      });
      if (!user)
        throw {
          name: "unauthentication",
          message: "email/password is incorrect",
        };
      if (password !== user.password)
        throw {
          name: "unauthentication",
          message: "email/password is incorrect",
        };
      const access_token = signToken({ id: user.id });
      res.status(200).json({ message: "Login Succsess", access_token });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, email, password, profile_picture } = req.body;
      await User.create({ username, email, password, profile_picture });
      res.status(201).json({ msg: "registration successfully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = { C_User, C_Project };
