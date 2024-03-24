const express = require("express");
const router = express.Router();

const {
  createTask,
  getAllTask,
  updateTask,
  deleteTask,
  getTaskById,
  searchTask,
  bulkTaskDelete,
} = require("../controllers/task/taskController");

router.route("/search").get(searchTask);
router.route("/").get(getAllTask);
router.route("/add").post(createTask);
router.route("/:id").patch(updateTask);
router.route("/:id").delete(deleteTask);
router.route("/:id").get(getTaskById);
router.route("/").delete(bulkTaskDelete);

module.exports = router;
