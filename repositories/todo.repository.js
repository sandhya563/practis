const { TodoModel } = require("../models");

class TodoRepository {
   async create(payload) {
        return await TodoModel.create(payload);
    }

    async getAll(filters = {}) {
        return await TodoModel.findAll({
            where: filters
        });
    }

    async getAllWithPagination(filters = {}, limit, offset) {
        return await TodoModel.findAndCountAll({
            where: filters,
            limit,
            offset,
            order: [["createdAt", "DESC"]]
        });
    }

    async getById(id) {
        return await TodoModel.findByPk(id);
    }

    async update(id, payload) {
        const todo = await TodoModel.findByPk(id);

        if (!todo) {
            return null;
        }

        await todo.update(payload);

        return todo;
    }

    async delete(id) {
        const todo = await TodoModel.findByPk(id);

        if (!todo) {
            return null;
        }

        await todo.destroy();

        return true;
    }
}

module.exports = new TodoRepository();