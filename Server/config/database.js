const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database Connected Successfully");
  } catch (error) {
    console.log(`Connection failed: ${error.message}`);
  }
};
module.exports = connectDB;
