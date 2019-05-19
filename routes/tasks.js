const express = require("express");
const router = express.Router();

const Task = require("../models/task");

router.get("/", (req, res, next) => {
  Task.getAllTask((err, tasks) => {
    res.send(tasks);
  });
});

router.post("/new", (req, res, next) => {
  let newTask = new Task({
    task_id: req.body.task_id,
    parent_task_id: req.body.parent_task_id,
    parent: req.body.parent,
    task: req.body.task,
    priority: req.body.priority,
    start_date: req.body.start_date,
    end_date: req.body.end_date
  });
  Task.addTask(newTask, (err, task) => {
    if (err) {
      res.json({ success: false, message: "Task Not created" });
    } else {
      res.json({ success: true, message: "Task Created" });
    }
  });
});

module.exports = router;
