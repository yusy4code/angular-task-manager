const express = require("express");
const router = express.Router();
const moment = require('moment');

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

router.get("/:id", (req, res) => {
  let task_id = parseInt(req.params.id);
  let query = { task_id: task_id };

  Task.find(query, (err, data) => {
    if (err) {
      res.json({ success: false, message: "Error while getting records" });
    } else {
      if (data.length > 0) {
        res.json({ success: true, data: data });
      } else {
        res.json({ success: false, message: "Task Not found" });
      }
    }
  });
});

router.put("/end/:id", (req, res) => {
  let task_id = parseInt(req.params.id);
  let query = { task_id: task_id };
  
  let today = moment().format("YYYY-MM-DD");
  let updatedData = {is_completed: true, end_date: today};

  Task.updateOne(query, updatedData, (err, data) => {
    if (err) return res.json({ success: false, message: "Task Not Found" });
    res.json({ success: true, message: "Task ended successfully" });
  });

});

router.put("/:id", (req, res) => {
  let task_id = parseInt(req.params.id);
  let query = { task_id: task_id };

  let taskObj = {
    task_id: task_id,
    parent: req.body.parent,
    task: req.body.task,
    priority: req.body.priority,
    start_date: req.body.start_date,
    end_date: req.body.end_date
  };

  Task.findOneAndUpdate(query, taskObj, (err, data) => {
    if (err) return res.json({ success: false, message: "Task Not Found" });
    res.json({ success: true, message: "Task saved successfully" });
  });
});

router.post("/new", (req, res) => {
  Task.findOne()
    .sort("-task_id")
    .exec((err, data) => {
      if (err) {
        return res.json({ success: false, message: "Task Not created" });
      } else {
        // auto increment the task_id field
        if (data == null) {
          var task_id = 1;
        } else {
          var task_id = data.task_id + 1;
        }

        // creating task object for inserting
        let taskObj = {
          task_id: task_id,
          parent: req.body.parent,
          task: req.body.task,
          priority: req.body.priority,
          start_date: req.body.start_date,
          end_date: req.body.end_date,
          is_completed: false
        };

        // creating the task
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
