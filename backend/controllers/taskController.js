
const Task = require('../models/Task');
const mongoose = require('mongoose');


exports.getTasks = async (req, res) => {
  try {
    const query = { userId: req.user.id };
    if (req.query.category) {
      query.category = req.query.category;
    }
    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.createTask = async (req, res) => {
  const { title, description, category } = req.body;
  try {
    const newTask = new Task({
      title,
      description,
      category,
      userId: req.user.id,
    });
    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'Invalid task id' });
    }
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { $set: req.body },
      { new: true }
    );
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'Invalid task id' });
    }
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    if (task.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    await task.deleteOne();
    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};