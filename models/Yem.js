const mongoose = require("mongoose");

const YemSchema = new mongoose.Schema({
  nomi: {
    type: String,
    required: [true, "Yem nomini kiriting"],
    trim: true,
  },
  miqdori: {
    type: Number,
    required: [true, "Miqdorini kiriting"],
  },
  narxi: {
    type: Number,
    required: [true, "Narxini kiriting"],
  },
  sana: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Yem", YemSchema);
