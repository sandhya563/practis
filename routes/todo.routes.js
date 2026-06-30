const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const todoController = require("../controllers/todoController");
const todoValidator = require("../validators/todo.validator");

router.post(
    "/",
    authMiddleware,
    todoValidator.createValidator,
    todoController.createTodo
);

router.get(
    "/",
    authMiddleware,
    todoController.getAllTodos
);

router.get(
    "/paginatedRecords",
    authMiddleware,
    todoController.getTodosWithPagination
);

router.get(
    "/:id",
    authMiddleware,
    todoValidator.getByIdValidator,
    todoController.getTodoById
);

router.put(
    "/:id",
    authMiddleware,
    todoValidator.updateValidator,
    todoController.updateTodo
);

router.delete(
    "/:id",
    authMiddleware,
    todoValidator.deleteValidator,
    todoController.deleteTodo
);

module.exports = router;