const mongoose = require("mongoose");

const MoliyaSchema = new mongoose.Schema({
  turi: {
    type: String,
    enum: ["kirim", "chiqim"],
    required: [true, "Turini tanlang (kirim yoki chiqim)"],
  },
  summa: {
    type: Number,
    required: [true, "Summani kiriting"],
  },
  izoh: {
    type: String,
    required: [true, "Izohni yozing"],
    trim: true,
  },
  sana: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Moliya", MoliyaSchema);
