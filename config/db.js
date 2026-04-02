const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB ulandi: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Xatolik: ${error.message}`);
    process.exit(1); // Xato bo'lsa serverni to'xtatadi
  }
};

module.exports = connectDB;
