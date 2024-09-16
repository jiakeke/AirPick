const express = require("express");
const app = express();
const orderRouter = require("./routes/orderRouter");
const userRouter = require("./routes/userRouter");
const connectDB = require("./config/db");
const {requestLogger,unknownEndpoint,errorHandler} = require("./middleware/customMiddleware");

connectDB();


// Middleware to parse JSON
app.use(express.json());
app.use(requestLogger);

let cors = require("cors");
app.use(cors());

// ==== Set up the routers below ======
app.use('/api/users',userRouter);

app.use('/api/orders', orderRouter);
// ==== Set up the routers above ======
app.use(unknownEndpoint);
app.use(errorHandler);

const port = process.env.PORT || 4000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
