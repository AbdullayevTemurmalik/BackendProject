const express = require("express");
const router = express.Router();
const {
  addTransaction,
  getTransactions,
  updateTransaction, // Buni importga qo'shdik
  deleteTransaction,
} = require("../controllers/moliyaController");

router.post("/add", addTransaction);
router.get("/all", getTransactions);
router.put("/update/:id", updateTransaction); // SHU YO'LNI QO'SHDIK!
router.delete("/delete/:id", deleteTransaction);

module.exports = router;
