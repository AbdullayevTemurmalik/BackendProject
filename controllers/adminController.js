const loginAdmin = (req, res) => {
  const { username, password } = req.body;

  // .env faylidagi login va parol bilan solishtiramiz
  const adminUser = process.env.ADMIN_USER;
  const adminPass = process.env.ADMIN_PASS;

  if (username === adminUser && password === adminPass) {
    res.status(200).json({
      success: true,
      message: "Xush kelibsiz, Admin!",
      // Keyinchalik bu yerga Token qo'shsak bo'ladi
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Login yoki parol xato!",
    });
  }
};

module.exports = { loginAdmin };
