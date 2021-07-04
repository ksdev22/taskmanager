const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["new", "in-progress", "done"],
  },
  title: String,
  details: String,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
