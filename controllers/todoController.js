const ToDo = require("../models/ToDo");

exports.getTodos = async (req, res) => {
  try {
    const todos = await ToDo.find({ userId: req.user.id });

    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve todos" });
  }
};

exports.createTodo = async (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ error: "Description is required" });
  }

  try {
    const newTodo = new ToDo({
      description,
      userId: req.user.id,
    });

    const savedTodo = await newTodo.save();

    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(500).json({ error: "Failed to create todo" });
  }
};

exports.updateTodo = async (req, res) => {
  const { description, done } = req.body;

  if (done !== undefined && typeof done !== "boolean") {
    return res.status(400).json({ error: "Invalid value for done" });
  }

  try {
    const todo = await ToDo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    if (todo.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const updatedTodo = await ToDo.findByIdAndUpdate(
      req.params.id,
      { description, done },
      { new: true }
    );

    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo" });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await ToDo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    if (todo.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await ToDo.findByIdAndDelete(req.params.id);

    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    const { done } = req.query;
    if (done === undefined) {
      return res
        .status(400)
        .json({ error: 'Query parameter "done" is required' });
    }
    await ToDo.deleteMany({ done: done === "true" });
    res.status(200).json({ message: "Todos deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todos" });
  }
};
