const app = require("../app");
const request = require("supertest");
const { User, Project } = require("../models");
const { signToken } = require("../helpers/jsonwebtoken");

const project01 = {
  name: "test project",
  picture1: "wwww.image.com/image1.png",
  picture2: "wwww.image.com/image2.png",
  picture3: "wwww.image.com/image3.png",
  longitude: "1234567",
  latitude: "654321",
  description: "this project is for testing",
  location: "Bandung",
  power: "2000",
};

let access_token = "";

beforeAll(async () => {
  const user = await User.create({
    username: "usertestproject",
    email: "userproject@email.com",
    password: "123456",
  });

  access_token = signToken({ id: user.id });
});

describe("Project Routes Test", () => {
  describe.skip("Create Project Test", () => {
    test('201 create project - should return message "project successfully created" and  create new project', (done) => {
      request(app)
        .post("/projects")
        .set("access_token", access_token)
        .send(project01)
        .end((err, res) => {
          if (err) done(err);
          const { body, status } = res;
          expect(status).toBe(201);
          expect(body).toHaveProperty("msg", "project successfully created");
          done();
        });
    });

    test('401 no access token - should return error with message "unauthentication"', (done) => {
      request(app)
        .post("/projects")
        .send(project01)
        .end((err, res) => {
          if (err) done(err);
          const { body, status } = res;
          expect(status).toBe(401);
          expect(body).toHaveProperty("msg", "unauthentication");
          done();
        });
    });

    test('401 invalid access token format - should return error with message "unauthentication"', (done) => {
      request(app)
        .post("/projects")
        .set("access_token", "invalidAccessToken")
        .send(project01)
        .end((err, res) => {
          if (err) done(err);
          const { body, status } = res;
          expect(status).toBe(401);
          expect(body).toHaveProperty("msg", "unauthentication");
          done();
        });
    });

    test('401 unknown access_token - should return error with message "unauthentication"', (done) => {
      request(app)
        .post("/projects")
        .set(
          "access_token",
          "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6NjF9.Xii9Kak1oj9xQyFPiOf-yZaEn6dzKX3ptnAqxTo_3WU"
        )
        .send(project01)
        .end((err, res) => {
          if (err) done(err);
          const { body, status } = res;
          expect(status).toBe(401);
          expect(body).toHaveProperty("msg", "unauthentication");
          done();
        });
    });

    test('400 null project name - should return error with message "project name is required"', (done) => {
      request(app)
        .post("/projects")
        .set("access_token", access_token)
        .send({
          picture1: "wwww.image.com/image1.png",
          picture2: "wwww.image.com/image2.png",
          picture3: "wwww.image.com/image3.png",
          longitude: "1234567",
          latitude: "654321",
          description: "this project is for testing",
          location: "Bandung",
          power: "2000",
        })
        .end((err, res) => {
          if (err) done(err);
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toHaveProperty("msg", "project name is required");
          done();
        });
    });

    test('400 empty project name - should return error with message "project name is required"', (done) => {
      request(app)
        .post("/projects")
        .set("access_token", access_token)
        .send({
          name: "",
          picture1: "wwww.image.com/image1.png",
          picture2: "wwww.image.com/image2.png",
          picture3: "wwww.image.com/image3.png",
          longitude: "1234567",
          latitude: "654321",
          description: "this project is for testing",
          location: "Bandung",
          power: "2000",
        })
        .end((err, res) => {
          if (err) done(err);
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toHaveProperty("msg", "project name is required");
          done();
        });
    });

    test('400 null latitude - should return error with message "project location (latitude) is required"', (done) => {
      request(app)
        .post("/projects")
        .set("access_token", access_token)
        .send({
          name: "project test",
          picture1: "wwww.image.com/image1.png",
          picture2: "wwww.image.com/image2.png",
          picture3: "wwww.image.com/image3.png",
          longitude: "1234567",
          description: "this project is for testing",
          location: "Bandung",
          power: "2000",
        })
        .end((err, res) => {
          if (err) done(err);
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toHaveProperty(
            "msg",
            "project location (latitude) is required"
          );
          done();
        });
    });

    test('400 empty latitude - should return error with message "project location (latitude) is required"', (done) => {
      request(app)
        .post("/projects")
        .set("access_token", access_token)
        .send({
          name: "project test",
          picture1: "wwww.image.com/image1.png",
          picture2: "wwww.image.com/image2.png",
          picture3: "wwww.image.com/image3.png",
          longitude: "1234567",
          latitude: "",
          description: "this project is for testing",
          location: "Bandung",
          power: "2000",
        })
        .end((err, res) => {
          if (err) done(err);
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toHaveProperty(
            "msg",
            "project location (latitude) is required"
          );
          done();
        });
    });
    test('400 null longitude - should return error with message "project location (longitude) is required"', (done) => {
      request(app)
        .post("/projects")
        .set("access_token", access_token)
        .send({
          name: "project test",
          picture1: "wwww.image.com/image1.png",
          picture2: "wwww.image.com/image2.png",
          picture3: "wwww.image.com/image3.png",
          latitude: "1234567",
          description: "this project is for testing",
          location: "Bandung",
          power: "2000",
        })
        .end((err, res) => {
          if (err) done(err);
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toHaveProperty(
            "msg",
            "project location (longitude) is required"
          );
          done();
        });
    });

    test('400 empty longitude - should return error with message "project location (longitude) is required"', (done) => {
      request(app)
        .post("/projects")
        .set("access_token", access_token)
        .send({
          name: "project test",
          picture1: "wwww.image.com/image1.png",
          picture2: "wwww.image.com/image2.png",
          picture3: "wwww.image.com/image3.png",
          longitude: "",
          latitude: "654321",
          description: "this project is for testing",
          location: "Bandung",
          power: "2000",
        })
        .end((err, res) => {
          if (err) done(err);
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toHaveProperty(
            "msg",
            "project location (longitude) is required"
          );
          done();
        });
    });
    test('400 empty power - should return error with message "project estimated power is required"', (done) => {
      request(app)
        .post("/projects")
        .set("access_token", access_token)
        .send({
          name: "project test",
          picture1: "wwww.image.com/image1.png",
          picture2: "wwww.image.com/image2.png",
          picture3: "wwww.image.com/image3.png",
          longitude: "123456",
          latitude: "654321",
          description: "this project is for testing",
          location: "Bandung",
          power: "",
        })
        .end((err, res) => {
          if (err) done(err);
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toHaveProperty(
            "msg",
            "project estimated power is required"
          );
          done();
        });
    });
    test('400 null power - should return error with message "project estimated power is required"', (done) => {
      request(app)
        .post("/projects")
        .set("access_token", access_token)
        .send({
          name: "project test",
          picture1: "wwww.image.com/image1.png",
          picture2: "wwww.image.com/image2.png",
          picture3: "wwww.image.com/image3.png",
          longitude: "123456",
          latitude: "654321",
          description: "this project is for testing",
          location: "Bandung",
        })
        .end((err, res) => {
          if (err) done(err);
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toHaveProperty(
            "msg",
            "project estimated power is required"
          );
          done();
        });
    });
    test('400 power is number - should return error with message "invalid power, power must be in number format"', (done) => {
      request(app)
        .post("/projects")
        .set("access_token", access_token)
        .send({
          name: "project test",
          picture1: "wwww.image.com/image1.png",
          picture2: "wwww.image.com/image2.png",
          picture3: "wwww.image.com/image3.png",
          longitude: "123456",
          latitude: "654321",
          description: "this project is for testing",
          location: "Bandung",
          power: "123er",
        })
        .end((err, res) => {
          if (err) done(err);
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toHaveProperty(
            "msg",
            "invalid power, power must be in number format"
          );
          done();
        });
    });
    test('400 empty location - should return error with message "project location is required"', (done) => {
      request(app)
        .post("/projects")
        .set("access_token", access_token)
        .send({
          name: "project test",
          picture1: "wwww.image.com/image1.png",
          picture2: "wwww.image.com/image2.png",
          picture3: "wwww.image.com/image3.png",
          longitude: "123456",
          latitude: "654321",
          description: "this project is for testing",
          location: "",
          power: "2000",
        })
        .end((err, res) => {
          if (err) done(err);
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toHaveProperty("msg", "project location is required");
          done();
        });
    });
    test('400 null location - should return error with message "project location is required"', (done) => {
      request(app)
        .post("/projects")
        .set("access_token", access_token)
        .send({
          name: "project test",
          picture1: "wwww.image.com/image1.png",
          picture2: "wwww.image.com/image2.png",
          picture3: "wwww.image.com/image3.png",
          longitude: "123456",
          latitude: "654321",
          description: "this project is for testing",
          power: "2000",
        })
        .end((err, res) => {
          if (err) done(err);
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toHaveProperty("msg", "project location is required");
          done();
        });
    });
  });
  describe.skip("Read all project test", () => {
    test("200 Success Read all project - should return first 12 projects with most recent update and likes", (done) => {
      request(app)
        .get("/projects")
        .end((err, res) => {
          if (err) done(err);
          const { body, status } = res;
          expect(status).toBe(200);
          expect(body.length).toBeLessThanOrEqual(12);
          expect(body[0]).toMatchObject(
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              location: expect.any(String),
              power: expect.any(String),
              latitude: expect.any(String),
              longitude: expect.any(String),
              User: expect.objectContaining({
                id: expect.any(Number),
                username: expect.any(String),
                profile_picture: expect.any(String),
              }),
              description: expect.any(String),
              Records: expect.arrayContaining([
                expect.objectContaining({
                  id: expect.any(Number),
                  createdAt: expect.any(String),
                  voltage: expect.any(Number),
                  current: expect.any(Number),
                  temperature: expect.any(Number),
                  humidity: expect.any(Number),
                  intensity: expect.any(Number),
                }),
              ]),
            })
          );
          done()
        });
    });
  },30000);

  describe("Read project by id",()=>{
    test("get project by id without specified record date",(done)=>{
      request(app).get('/projects/1/latest').end((err,res)=>{
        if(err) done(err)
        const {body,status} = res
        expect(status).toBe(200)
        expect(body).toMatchObject(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            location: expect.any(String),
            power: expect.any(String),
            latitude: expect.any(String),
            longitude: expect.any(String),
            User: expect.objectContaining({
              id: expect.any(Number),
              username: expect.any(String),
              profile_picture: expect.any(String),
            }),
            description: expect.any(String),
            Records: expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(Number),
                createdAt: expect.any(String),
                voltage: expect.any(Number),
                current: expect.any(Number),
                temperature: expect.any(Number),
                humidity: expect.any(Number),
                intensity: expect.any(Number),
              }),
            ]),
          })
        );
        done()
      })
    })


    test("get project by id with specified record date",(done)=>{
      request(app).get('/projects/1/2023-07-10').end((err,res)=>{
        if(err) done(err)
        const {body,status} = res
        expect(status).toBe(200)
        expect(body).toMatchObject(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            location: expect.any(String),
            power: expect.any(String),
            latitude: expect.any(String),
            longitude: expect.any(String),
            User: expect.objectContaining({
              id: expect.any(Number),
              username: expect.any(String),
              profile_picture: expect.any(String),
            }),
            description: expect.any(String),
            Records: expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(Number),
                createdAt: expect.any(String),
                voltage: expect.any(Number),
                current: expect.any(Number),
                temperature: expect.any(Number),
                humidity: expect.any(Number),
                intensity: expect.any(Number),
              }),
            ]),
          })
        );
        const date = new Date(body.Records[0].createdAt)
        const compDate = new Date('2023-07-10')
        expect([date.getFullYear(),date.getMonth(),date.getDate()].join()).toBe([compDate.getFullYear(),compDate.getMonth(),compDate.getDate()].join())
        done()
      })
    },30000)

  })
});
