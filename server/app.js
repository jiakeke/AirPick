const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// ==== Set up the routers below ======


// ==== Set up the routers above ======


const port = 4000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
