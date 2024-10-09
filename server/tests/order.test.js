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
let createdOrderId = null;

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

// Order test need logged in passenger
describe("Order test for the passenger start", () => {
  it("should log in the passenger first.", async () => {
    const result = await api
      .post("/api/users/login")
      .send({
        email: passenger.email,
        password: passenger.password,
      })

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('Login successful');

    token = result.body.user.token;
  });

  // Need balance to create an order
  it("should deposit some balance to the passenger first.", async () => {
    const result = await api
      .put("/api/users/deposit")
      .send({
        balance: 999,
      })
      .set("Authorization", "bearer " + token)

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('Deposit successful!');
  });

  // Need to add a phone number to create an order
  it("should add a phone number to the passenger.", async () => {
    const result = await api
      .put("/api/users")
      .send({ phone: "123456789" })
      .set("Authorization", "bearer " + token)
      
    expect(result.status).toBe(200);
  });

  // Test POST /api/orders
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
      .set("Authorization", "bearer " + token)

    expect(result.status).toBe(201);
    expect(result.body.message).toBe('Order created');

    createdOrderId = result.body.savedOrder._id;
  });

  // Test GET /api/orders/myorder
  it("should return the orders the passenger has created.", async () => {
    const result = await api
      .get("/api/orders/myorder")
      .set("Authorization", "bearer " + token)

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('Successive get orders');
  });

  // Test PUT /api/orders/update/:orderId
  it("should update the order info.", async () => {
    const updatedOrder = {
      persons: "1",
    };
    const result = await api
      .put(`/api/orders/update/${createdOrderId}`)
      .send(updatedOrder)
      .set("Authorization", "bearer " + token)

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('Order updated successfully');
  });

  // Test Get /api/orders/:orderId
  it("should return the order info.", async () => {
    const result = await api
      .get(`/api/orders/${createdOrderId}`)
      .set("Authorization", "bearer " + token)

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('Successive get order');
  });

  // Test PUT /api/orders/cancel/passenger/:orderId
  it("should cancel the order.", async () => {
    const result = await api
      .put(`/api/orders/cancel/passenger/${createdOrderId}`)
      .set("Authorization", "bearer " + token)
    
    expect(result.status).toBe(200);
    expect(result.body.message).toBe('Order cancelled successfully');

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
  
    const createResult = await api
      .post("/api/orders")
      .send(newOrder)
      .set("Authorization", "bearer " + token);
  
    expect(createResult.status).toBe(201);
    expect(createResult.body.message).toBe('Order created');
    
    createdOrderId = createResult.body.savedOrder._id;
  });
});

// Order test need logged in driver
describe("Order test for the driver start", () => {
  it("should log in the driver first", async () => {
    const result = await api
      .post("/api/users/login")
      .send({
        email: driver.email,
        password: driver.password,
      })

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('Login successful');

    token = result.body.user.token;

    const result2 = await api
      .put("/api/users")
      .send({ phone: "123456789" })
      .set ("Authorization", "bearer " + token)

    expect(result2.status).toBe(200);
  });

  // Test GET /api/orders/orderlist
  it("should return the orders the driver can see.", async () => {
    const result = await api
      .get("/api/orders/orderlist")
      .set("Authorization", "bearer " + token)

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('Successive get orders');
  });

  // Test PUT /api/orders/accept/:orderId
  it("should accept the order.", async () => {
    const result = await api
      .put(`/api/orders/accept/${createdOrderId}`)
      .set("Authorization", "bearer " + token)

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('Order accepted');
  });

  // Test PUT /api/orders/cancel/driver/:orderId
  it("should cancel the order.", async () => {
    const result = await api
      .put(`/api/orders/cancel/driver/${createdOrderId}`)
      .set("Authorization", "bearer " + token);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('Order is now available again');

    const newresult = await api
      .put(`/api/orders/accept/${createdOrderId}`)
      .set ("Authorization", "bearer " + token)

    expect(newresult.status).toBe(200);
    expect(newresult.body.message).toBe('Order accepted');
  });

  // Test PUT /api/orders/start/:orderId
  it("should start the order.", async () => {
    const result = await api
      .put(`/api/orders/start/${createdOrderId}`)
      .set("Authorization", "bearer " + token)

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('Order started');
  });

  // Test PUT /api/orders/completeorstop/:orderId (stop)
  it("should stop the order.", async () => {
    const result = await api
      .put(`/api/orders/completeorstop/${createdOrderId}`)
      .send({ action: "stop" })
      .set("Authorization", "bearer " + token)

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('Order stop');

    const newresult = await api
      .put(`/api/orders/start/${createdOrderId}`)
      .set ("Authorization", "bearer " + token)

    expect(newresult.status).toBe(200);
    expect(newresult.body.message).toBe('Order started');
  });

  // Test PUT /api/orders/completeorstop/:orderId (complete)
  it("should complete the order.", async () => {
    const result = await api
      .put(`/api/orders/completeorstop/${createdOrderId}`)
      .send({ action: "complete" })
      .set("Authorization", "bearer " + token)

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('Order complete');
  });
});