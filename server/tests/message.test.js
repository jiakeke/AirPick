const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("./testApp");
const api = supertest(app);
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const Message = require("../models/messageModel");

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

let passenger_token = null;
let passenger_id = null;
let driver_token = null;
let createdOrderId = null;
let createdMessageId = null;

beforeAll(async () => {
  await User.deleteMany({});
  await Order.deleteMany({});
  await api.post("/api/users/regist").send(driver);
  await api.post("/api/users/regist").send(passenger);
});

afterAll(async () => {
  await User.deleteMany({});
  await Order.deleteMany({});
  mongoose.connection.close();
});

// Message test need logged in passenger/driver and created order
describe("Message test start", () => {
  // Passenger login
  it("should log in the passenger first.", async () => {
    const result = await api
      .post("/api/users/login")
      .send({
        email: passenger.email,
        password: passenger.password,
      })

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('Login successful');

    passenger_token = result.body.user.token;
    passenger_id = result.body.user.userId;

    const deposit_result = await api
      .put("/api/users/deposit")
      .send({
        balance: 999,
      })
      .set("Authorization", "bearer " + passenger_token)

    expect(deposit_result.status).toBe(200);
    expect(deposit_result.body.message).toBe('Deposit successful!');

    const phone_result = await api
      .put("/api/users")
      .send({ phone: "123456789" })
      .set("Authorization", "bearer " + passenger_token)
      
    expect(phone_result.status).toBe(200);
  });

  // driver login
  it("should log in the driver first.", async () => {
    const result = await api
      .post("/api/users/login")
      .send({
        email: driver.email,
        password: driver.password,
      })

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('Login successful');

    driver_token = result.body.user.token;

    const phone_result = await api
      .put("/api/users")
      .send({ phone: "123456789" })
      .set("Authorization", "bearer " + driver_token)
      
    expect(phone_result.status).toBe(200);
  });

  // Need to create an order to send a message
  it("should create a new order.", async () => {
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
    const result = await api
      .post("/api/orders")
      .send(newOrder)
      .set("Authorization", "bearer " + passenger_token)

    expect(result.status).toBe(201);
    expect(result.body.message).toBe('Order created');

    createdOrderId = result.body.savedOrder._id;
  });

  // Test POST /api/messages/send
  it("should send a message.", async () => {
    const newMessage = {
      receiverId: passenger_id,
      orderId: createdOrderId,
      content: "Test message",
    };
    const result = await api
      .post("/api/messages/send")
      .send(newMessage)
      .set("Authorization", "bearer " + driver_token)

    expect(result.status).toBe(201);
    expect(result.body.message).toBe('Message sent successfully');

    createdMessageId = result.body.data._id;
  });

  // Test GET /api/messages/
  it("should return the messages.", async () => {
    const passenger_result = await api
      .get("/api/messages")
      .set("Authorization", "bearer " + passenger_token)

    expect(passenger_result.status).toBe(200);

    const driver_result = await api
      .get("/api/messages")
      .set("Authorization", "bearer " + driver_token)

    expect(driver_result.status).toBe(200);
  });

  // Test GET /api/messages/unread-count
  it("should return the unread messages count.", async () => {
    const result = await api
      .get("/api/messages/unread-count")
      .set("Authorization", "bearer " + passenger_token)

    expect(result.status).toBe(200);
    expect(result.body.unreadMessagesCount).toBe(1);
  });

  // Test POST /api/messages/mark-read
  it("should mark messages as read.", async () => {
    const result = await api
      .post("/api/messages/mark-read")
      .send({ messageIds: [createdMessageId] })
      .set("Authorization", "bearer " + passenger_token)

    expect(result.status).toBe(200);

    const unread_result = await api
      .get("/api/messages/unread-count")
      .set("Authorization", "bearer " + passenger_token)

    expect(unread_result.status).toBe(200);
    expect(unread_result.body.unreadMessagesCount).toBe(0);
  });
});