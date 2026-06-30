const { UserModel } = require("../models");

class UserRepository {
    async create(payload) {
        return await UserModel.create(payload);
    }

    async findByEmail(email) {
        return await UserModel.findOne({
            where: { email }
        });
    }

    async getAll(filters = {}) {
        return await UserModel.findAll({
            where: filters,
            attributes: { exclude: ["password"] }
        });
    }

    async getAllWithPagination(filters = {}, limit, offset) {
        return await UserModel.findAndCountAll({
            where: filters,
            limit,
            offset,
            attributes: { exclude: ["password"] },
            order: [["createdAt", "DESC"]]
        });
    }

    async getById(id) {
        return await UserModel.findByPk(id, {
            attributes: { exclude: ["password"] }
        });
    }

    async update(id, payload) {
        const user = await UserModel.findByPk(id);

        if (!user) {
            return null;
        }

        await user.update(payload);

        return user;
    }

    async delete(id) {
        const user = await UserModel.findByPk(id);

        if (!user) {
            return null;
        }

        await user.destroy();

        return true;
    }
}
module.exports = new UserRepository();