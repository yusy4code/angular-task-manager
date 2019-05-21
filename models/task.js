const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  task_id: {
    type: Number
  },
  task: {
    type: String
  },
  parent: {
    type: String
  },
  start_date: {
    type: Date
  },
  end_date: {
    type: Date
  },
  priority: {
    type: Number
  }
});

const Task = (module.exports = mongoose.model("Task", TaskSchema));
