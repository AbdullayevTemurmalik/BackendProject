const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// 1. Routerlarni import qilish
const yemRoutes = require("./routes/yemRoutes");
const moliyaRoutes = require("./routes/moliyaRoutes");
const adminRoutes = require("./routes/adminRoutes");

// 2. Muhit o'zgaruvchilarini yuklash (.env)
dotenv.config();

// 3. MongoDB bazasiga ulanish
connectDB();

const app = express();

// 4. Middleware sozlamalari
app.use(express.json()); // JSON formatini tushunish uchun

// CORS - Frontend bilan xatosiz bog'lanish uchun
// origin qismiga keyinchalik Vercel bergan URL-ni qo'shib qo'yishing mumkin
app.use(
  cors({
    origin: "*", // Hozircha hamma joydan ruxsat, lekin deployda Vercel URL-ni yozish tavsiya etiladi
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// 5. API yo'nalishlarini (Route) ulaymiz
// Frontend'dagi baseURL: "http://localhost:5000/api" ga moslangan
app.use("/api/yem", yemRoutes);
app.use("/api/moliya", moliyaRoutes);
app.use("/api/admin", adminRoutes);

// 6. Asosiy test yo'nalishi (Server ishlashini tekshirish uchun)
app.get("/", (req, res) => {
  res
    .status(200)
    .send("🚀 Qo'ychilik loyihasi Backend serveri muvaffaqiyatli ishlayapti!");
});

// 7. Mavjud bo'lmagan API yo'llarini ushlash (404 Error Handling)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Kechirasiz, bunday API manzili mavjud emas!",
  });
});

// 8. Serverni ishga tushirish
// Render PORT-ni o'zi avtomat beradi, shuning uchun process.env.PORT shart
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server muvaffaqiyatli ishga tushdi!`);
  console.log(`🌐 Manzil: http://localhost:${PORT}`);
  console.log(`📊 Baza: MongoDB ulandi.`);
});
