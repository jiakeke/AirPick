const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");

const user = {
  first_name: "firstNameTest",
  last_name: "lastNameTest",
  email: "testemail@email.com",
  password: "hhdhhdhhd",
  category: "driver",
};

var token = null;
beforeAll(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await User.deleteMany({});
  mongoose.connection.close();
});

describe("User test start", () => {
  // Test POST /api/users/regist
  it("should regist a new user", async () => {
    await api
      .post("/api/users/regist")
      .send(user)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  // Test POST /api/users/login
  it("should login user and return a token", async () => {
    const response = await api
      .post("/api/users/login")
      .send({ email: user.email, password: user.password })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    token = response.body.user.token;
    expect(token).not.toBeNull();
  });

  it("should return 400 if no corresponding email", async () => {
    await api
      .post("/api/users/login")
      .send({ email: "noonewilluse@email.com", password: "noonewilluse" })
      .expect(400);
  });

  it("should return 400 if the password is incorrect", async () => {
    await api
      .post("/api/users/login")
      .send({ email: user.email, password: "wrongpassword" })
      .expect(400);
  });

  // Test GET /api/users
  it("should return user info when GET /api/users is called", async () => {
    const response = await api
      .get("/api/users")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.first_name).toBe(user.first_name);
    expect(response.body.last_name).toBe(user.last_name);
    expect(response.body.email).toBe(user.email);
    expect(response.body.category).toBe(user.category);
  });

  // Test put /api/users
  it("should update a user with partial date when PUT /api/users is called", async () => {
    const updateUser = {
      first_name: "firstNameUpdated",
      last_name: "lastNameUpdated",
    };

    const response = await api
      .put("/api/users")
      .set("Authorization", "bearer " + token)
      .send(updateUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const _id = response.body._id;
    const updatedUserCheck = await User.findById(_id);
    expect(updatedUserCheck.first_name).toBe(updateUser.first_name);
    expect(updatedUserCheck.last_name).toBe(updateUser.last_name);
  });
});
