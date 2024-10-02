const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Order = require("../models/orderModel");

const driver = {
  first_name: "firstNameTest",
  last_name: "lastNameTest",
  email: "testemail@email.com",
  password: "hhdhhdhhd",
  category: "driver",
};

const passenger = {
  first_name: "hhd",
  last_name: "hhd",
  email: "hhdhhd@hhd.com",
  password: "hhdhhdhhd",
  category: "passenger",
};

let token = null;

const orders = [
  {
    category: "Pick",
    departure: "Pick up departure",
    destination: "Pick up destination",
    persons: 3,
    luggages: 4,
    flight: "E4448",
    date: "02.03.2024",
    passenger: "333",
    driver: "222",
    comments: "Child seat required ",
    price: 888,
    status: "new",
    created: "02.03.2024",
    modified: "02.03.2024",
    completed: "02.03.2024",
  },
  {
    category: "Drop",
    departure: "Drop up departure",
    destination: "Drop up destination",
    persons: 3,
    luggages: 4,
    flight: "E4448",
    date: "02.03.2024",
    passenger: "333",
    driver: "222",
    comments: "Child seat required ",
    price: 888,
    status: "ongoing",
    created: "02.03.2024",
    modified: "02.03.2024",
    completed: "02.03.2024",
  },
  {
    category: "Pick",
    departure: "Pick up departure",
    destination: "Pick up destination",
    persons: 3,
    luggages: 4,
    flight: "E4448",
    date: "02.03.2024",
    passenger: "333",
    driver: "222",
    comments: "Child seat required ",
    price: 888,
    status: "completed",
    created: "02.03.2024",
    modified: "02.03.2024",
    completed: "02.03.2024",
  },
  {
    category: "Drop",
    departure: "Drop up departure",
    destination: "Drop up destination",
    persons: 3,
    luggages: 4,
    flight: "E4448",
    date: "02.03.2024",
    passenger: "333",
    driver: "222",
    comments: "Child seat required ",
    price: 888,
    status: "cancelled",
    created: "02.03.2024",
    modified: "02.03.2024",
    completed: "02.03.2024",
  },
];

beforeAll(async () => {
  await User.deleteMany({});
  await api.post("/api/users/regist").send(driver);
  await api.post("/api/users/regist").send(passenger);
});

afterAll(() => {
  mongoose.connection.close();
});

describe("Order test for the passenger start", () => {
  it("should log in the passenger first", async () => {
    const result = await api
      .post("/api/users/login")
      .send({
        email: passenger.email,
        password: passenger.password,
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    token = result.body.user.token;
  });

  // Test PUT /api/users/deposit
  it("should deposit some balance to the passenger first", async () => {
    await api
      .put("/api/users/deposit")
      .send({
        balance: 999,
      })
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  // Test POST /api/orders
  it("should create a new order when POST /api/orders is called", async () => {
    const newOrder = {
      category: "Pick",
      departure: "Lentäjäntie 3, 01530 Vantaa",
      destination: "Lakitie 8 E 7 02770 Espoo",
      persons: "3",
      luggages: "4",
      flight: "E4448",
      date: "02.03.2024",
      comments: "",
      price: "18",
    };
    await api
      .post("/api/orders")
      .send(newOrder)
      .set("Authorization", "bearer " + token)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  // Test GET /api/orders/myorder
  it("should return the orders the passenger has created.", async () => {
    await api
      .get("/api/orders/myorder")
      .set("Authorization", "bearer " + token)
      .expect(200); // the expect has not been writen yet
  });

  // Test PUT /api/orders/update/:orderId
  it("should update the order info when api is called.", async () => {});
});
