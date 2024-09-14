const express = require('express');
const connectDB = require("./config/db");
const app = express();
const userRouter=require("./routes/userRouter")
const {requestLogger,unknownEndpoint,errorHandler} = require("./middleware/customMiddleware");

connectDB();

// Middleware to parse JSON
app.use(express.json());
app.use(requestLogger);

// ==== Set up the routers below ======
app.use('/api/users',userRouter);

// ==== Set up the routers above ======
app.use(unknownEndpoint);
app.use(errorHandler);


const port = process.env.PORT || 4000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
