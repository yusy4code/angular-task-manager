const express = require("express");
const router = express.Router();

const Task = require("../models/task");

router.get("/", (req, res, next) => {
  Task.find({}, (err, data) => {
    if (err) {
      res.json({ success: false, message: "Error while getting records" });
    } else {
      res.json(data);
    }
  });
});

router.post("/new", (req, res) => {
  Task.findOne()
    .sort("-task_id")
    .exec((err, data) => {
      if (err) {
        return res.json({ success: false, message: "Task Not created" });
      } else {
        if (data == null) {
          var task_id = 1;
        } else {
          var task_id = data.task_id + 1;
        }
        let parent = req.body.parent;
        let task = req.body.task;
        let priority = req.body.priority;
        let start_date = req.body.start_date;
        let end_date = req.body.end_date;
        let taskObj = {
          task_id: task_id,
          parent: parent,
          task: task,
          priority: priority,
          start_date: start_date,
          end_date: end_date
        };
        Task.create(taskObj, err => {
          if (err) {
            res.json({ success: false, message: "Task Not created" });
          } else {
            res.json({ success: true, message: "Task created" });
          }
        });
      }
    });
});

module.exports = router;
