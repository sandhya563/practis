const todoRepository = require("../repositories/todo.repository");

class TodoService {
    async createTodo(payload) {
        const todo = await todoRepository.create(payload);

        return todo;
    }

    async getAllTodos(query) {
        const filters = {};

        if (query.completed !== undefined) {
            filters.completed = query.completed;
        }

        const todos = await todoRepository.getAll(filters);

        return todos;
    }

    async getTodosWithPagination(page, limit, query = {}) {
        const offset = (page - 1) * limit;

        const filters = {};

        if (query.completed !== undefined) {
            filters.completed = query.completed;
        }

        const result = await todoRepository.getAllWithPagination(
            filters,
            limit,
            offset
        );

        return {
            totalRecords: result.count,
            totalPages: Math.ceil(result.count / limit),
            currentPage: page,
            records: result.rows
        };
    }

    async getTodoById(id) {
        const todo = await todoRepository.getById(id);

        if (!todo) {
            throw new Error("Todo not found");
        }

        return todo;
    }

    async updateTodo(id, payload) {
        const todo = await todoRepository.update(id, payload);

        if (!todo) {
            throw new Error("Todo not found");
        }

        return todo;
    }

    async deleteTodo(id) {
        const deleted = await todoRepository.delete(id);

        if (!deleted) {
            throw new Error("Todo not found");
        }

        return {
            message: "Todo deleted successfully"
        };
    }
}
module.exports = new TodoService();