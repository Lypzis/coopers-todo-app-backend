const express = require("express");
const {
  getTodos,
  createTodo,
  deleteAll,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// these routes are only accessible to an autheticated user
router.get("/", authMiddleware, getTodos);
router.post("/", authMiddleware, createTodo);
router.delete("/", authMiddleware, deleteAll);
router.put("/:id", authMiddleware, updateTodo);
router.delete("/:id", authMiddleware, deleteTodo);

module.exports = router;
