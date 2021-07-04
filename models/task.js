const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["new", "in-progress", "done"],
  },
  title: String,
  details: String,
});

module.exports = mongoose.model("Task", taskSchema);
