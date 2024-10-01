const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Order = require("../models/orderModel");

const orders = [
  {
    category: "Pick",
    departure: "Lentäjäntie 3, 01530 Vantaa",
    destination: "Lakitie 8 E 7 02770 Espoo",
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
    category: "Pick",
    departure: "Lentäjäntie 3, 01530 Vantaa",
    destination: "Lakitie 8 E 7 02770 Espoo",
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
];

let token = null;

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api.post("/api/users/login").send({
    email: "testemail@email.com",
    password: "hhdhhdhhd",
  });
  token = result.body.user.token;
});

afterAll(() => {
  mongoose.connection.close();
});

describe("givev there are initially some ");
