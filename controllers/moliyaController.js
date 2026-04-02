const Moliya = require("../models/Moliya");
const axios = require("axios");

// 1. Qo'shish
exports.addTransaction = async (req, res) => {
  try {
    const { turi, summa, izoh } = req.body;
    const yangiMoliya = await Moliya.create({ turi, summa, izoh });

    // Telegram xabar
    const token = process.env.MOLIYA_BOT_TOKEN;
    const chatId = process.env.CHAT_ID;
    const emoji = turi === "kirim" ? "💰" : "💸";
    const text = `${emoji} *Yangi Moliya Amali!*\n\n📂 *Turi:* ${turi.toUpperCase()}\n💵 *Summa:* ${Number(summa).toLocaleString("uz-UZ")} so'm\n📝 *Izoh:* ${izoh}`;

    try {
      await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
      });
    } catch (err) {
      console.log("Bot error ignored");
    }

    res.status(201).json({ success: true, data: yangiMoliya });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 2. Hammasini olish
exports.getTransactions = async (req, res) => {
  try {
    const amallar = await Moliya.find().sort({ sana: -1 });
    res.status(200).json({ success: true, data: amallar });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Tahrirlash (UPDATE - SHU QISMI YO'Q EDI)
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const yangilangan = await Moliya.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!yangilangan)
      return res.status(404).json({ success: false, message: "Topilmadi!" });
    res.status(200).json({ success: true, data: yangilangan });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 4. O'chirish
exports.deleteTransaction = async (req, res) => {
  try {
    await Moliya.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "O'chirildi" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
