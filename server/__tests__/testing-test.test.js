const data = {
  name: "Testing Project Name",
  description: "Project Description",
  location: "malang",
  power: "2000",
  latitude: "12345",
  longitude: "54321",
  id: 2,
  picture1: "www.image.com",
  picture2: "www.image.com",
  picture3: "www.image.com",
  User: {
    id: 1,
    username: "Roby Testing",
    profile_picture: "www.image.com",
  },
  Records: [
    {
      id: 1,
      createdAt: "date",
      voltage: 223.1,
      current: 321.5,
      temperature: 27,
      humidity: 102,
      intensity: 990,
    },
    {
      id: 2,
      createdAt: "date",
      voltage: 223.1,
      current: 321.5,
      temperature: 27,
      humidity: 102,
      intensity: 990,
    },
  ],
};

const data2 = require("./data.json");


test.skip("testing project format", () => {
  expect(data2[0]).toMatchObject(
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
});
