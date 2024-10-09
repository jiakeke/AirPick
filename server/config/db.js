const mongoose = require("mongoose");

const dbLink = 
  process.env.NODE_ENV === "test" 
    ? process.env.TEST_DBLINK || "mongodb://localhost:27017/web-dev-test"
    : process.env.DBLINK || "mongodb://localhost:27017/web-dev";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbLink);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
