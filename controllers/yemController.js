const Yem = require("../models/Yem");
const axios = require("axios");

// 1. Yangi yem qo'shish (Create)
const createYem = async (req, res) => {
  try {
    const { nomi, miqdori, narxi } = req.body;
    if (!nomi || !miqdori || !narxi) {
      return res
        .status(400)
        .json({ success: false, message: "Ma'lumotlarni to'liq kiriting!" });
    }

    const yangiYem = await Yem.create({ nomi, miqdori, narxi });

    // Telegramga xabar
    const token = process.env.YEM_BOT_TOKEN;
    const chatId = process.env.CHAT_ID;
    const formatNarx = Number(narxi).toLocaleString("uz-UZ");
    const text = `🌾 *Yangi yem kiritildi!*\n\n📝 *Nomi:* ${nomi}\n⚖️ *Miqdori:* ${miqdori} kg\n💰 *Narxi:* ${formatNarx} so'm`;

    try {
      await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
      });
    } catch (err) {
      console.log("Bot error ignored");
    }

    res.status(201).json({ success: true, data: yangiYem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Hamma yemlarni olish (Read)
const getAllYem = async (req, res) => {
  try {
    const yemlar = await Yem.find().sort({ sana: -1 });
    res.status(200).json({ success: true, data: yemlar });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Tahrirlash (Update)
const updateYem = async (req, res) => {
  try {
    const { id } = req.params;
    const yangilangan = await Yem.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!yangilangan)
      return res.status(404).json({ success: false, message: "Topilmadi!" });
    res.status(200).json({ success: true, data: yangilangan });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 4. O'chirish (Delete)
const deleteYem = async (req, res) => {
  try {
    const ocherilgan = await Yem.findByIdAndDelete(req.params.id);
    if (!ocherilgan)
      return res.status(404).json({ success: false, message: "Topilmadi!" });
    res.status(200).json({ success: true, message: "O'chirildi!" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { createYem, getAllYem, updateYem, deleteYem };
