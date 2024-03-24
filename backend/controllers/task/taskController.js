const Task = require("../../model/taskModel");
const User = require("../../model/userModel");

const createTask = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ success: false, message: "Enter both Fields" });
  }

  try {
    const task = await Task.create({ title, description, user: req.user.id });
    await task.populate("user");

    return res
      .status(201)
      .json({ success: true, message: "Task created", data: task });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
      data: error?.message,
    });
  }
};

const getAllTask = async (req, res) => {
  try {
    const allTasks = await Task.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      success: true,
      message: "All Tasks",
      data: allTasks,
      total: allTasks.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
      data: error?.message,
    });
  }
};

const updateTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const taskExists = await Task.findOne({ _id: taskId });
    if (!taskExists) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      { _id: taskId, user: req.user.id },
      req.body,
      {
        new: true,
      }
    );
    return res
      .status(200)
      .json({ success: true, message: "Task updated", data: updatedTask });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
      data: error?.message,
    });
  }
};

const deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const taskExists = await Task.findOne({ _id: taskId });
    if (!taskExists) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    const deletedTask = await Task.findByIdAndDelete({
      _id: taskId,
      user: req.user.id,
    });

    return res
      .status(200)
      .json({ success: true, message: "Task deleted", data: deletedTask });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
      data: error?.message,
    });
  }
};

const getTaskById = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Task found", data: task });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
      data: error?.message,
    });
  }
};

const searchTask = async (req, res) => {
  const { search } = req.query;

  try {
    const searchRegex = new RegExp(search, "i");
    const tasks = await Task.find({ title: searchRegex });

    return res
      .status(200)
      .json({ success: true, message: "Searched tasks", data: tasks });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
      data: error?.message,
    });
  }
};

const bulkTaskDelete = async (req, res) => {
  try {
    const tasks = await Task.deleteMany({ _id: { $in: req.body } });
    return res.status(200).json({
      success: true,
      total: tasks.deletedCount,
      message: `Deleted ${tasks.deletedCount} tasks`,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error occured", data: error.message });
  }
};

module.exports = {
  createTask,
  getAllTask,
  updateTask,
  deleteTask,
  getTaskById,
  searchTask,
  bulkTaskDelete,
};
