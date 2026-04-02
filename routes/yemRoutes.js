const express = require("express");
const router = express.Router();
const {
  createYem,
  getAllYem,
  updateYem,
  deleteYem,
} = require("../controllers/yemController");

router.post("/add", createYem);
router.get("/all", getAllYem);
router.put("/update/:id", updateYem);
router.delete("/delete/:id", deleteYem);

module.exports = router;
