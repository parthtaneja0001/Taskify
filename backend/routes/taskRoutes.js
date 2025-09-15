
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

router.route('/').get(auth, getTasks).post(auth, createTask);
router.route('/:id').patch(auth, updateTask).delete(auth, deleteTask);

module.exports = router;