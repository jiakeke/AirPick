const express = require('express');
const app = express();
const userRouter=require("./routes/userRouter")

// Middleware to parse JSON
app.use(express.json());

// ==== Set up the routers below ======
app.use('/users',userRouter);

// ==== Set up the routers above ======


const port = 4001;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
