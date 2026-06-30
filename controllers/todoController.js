const todoService = require("../services/todo.service");

class TodoController {
    async createTodo(req, res, next) {
        try {
            const payload = req.body;

            const todo = await todoService.createTodo(payload);

            res.status(201).json({
                success: true,
                message: "Todo created successfully",
                data: todo
            });
        } catch (error) {
            next(error);
        }
    }

    async getAllTodos(req, res, next) {
        try {
            const todos = await todoService.getAllTodos();

            res.status(200).json({
                success: true,
                data: todos
            });
        } catch (error) {
            next(error);
        }
    }

    async getTodosWithPagination(req, res, next) {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            const result = await todoService.getTodosWithPagination(page, limit);

            res.status(200).json({
                success: true,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async getTodoById(req, res, next) {
        try {
            const todoId = req.params.id;

            const todo = await todoService.getTodoById(todoId);

            res.status(200).json({
                success: true,
                data: todo
            });
        } catch (error) {
            next(error);
        }
    }

    async updateTodo(req, res, next) {
        try {
            const todoId = req.params.id;
            const payload = req.body;

            const updatedTodo = await todoService.updateTodo(todoId, payload);

            res.status(200).json({
                success: true,
                message: "Todo updated successfully",
                data: updatedTodo
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteTodo(req, res, next) {
        try {
            const todoId = req.params.id;

            const result = await todoService.deleteTodo(todoId);

            res.status(200).json({
                success: true,
                message: result.message
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TodoController();