const userService = require("../services/user.service");

class UserController {
    async signup(req, res, next) {
        try {
            const payload = req.body;

            const user = await userService.signup(payload);

            res.status(201).json({
                success: true,
                message: "User created successfully",
                data: user
            });
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const payload = req.body;

            const result = await userService.login(payload);

            res.status(200).json({
                success: true,
                message: "Login successful",
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();

            res.status(200).json({
                success: true,
                data: users
            });
        } catch (error) {
            next(error);
        }
    }

    async getUsersWithPagination(req, res, next) {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            const result = await userService.getUsersWithPagination(page, limit);

            res.status(200).json({
                success: true,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async getUserById(req, res, next) {
        try {
            const user = await userService.getUserById(req.params.id);

            res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            next(error);
        }
    }

    async updateUser(req, res, next) {
        try {
            const userId = req.params.id;
            const payload = req.body;

            const user = await userService.updateUser(userId, payload);

            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: user
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const userId = req.params.id;

            const result = await userService.deleteUser(userId);

            res.status(200).json({
                success: true,
                message: result.message
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();