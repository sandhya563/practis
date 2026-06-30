const bcrypt = require("bcrypt");
const userRepository = require("../repositories/user.repository");

 class UserService {
    async signup(payload) {
        const existingUser = await userRepository.findByEmail(
            payload.email
        );

        if (existingUser) {
            throw new Error("Email already exists");
        }

        const hashedPassword = await bcrypt.hash(
            payload.password,
            10
        );

        payload.password = hashedPassword;

        const user = await userRepository.create(payload);

        return user;
    }

    async login(email, password) {
        const user = await userRepository.findByEmail(email);

        if (!user) {
            throw new Error("Invalid email or password");
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            throw new Error("Invalid email or password");
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        };
    }

    async getAllUsers(query = {}) {
        const filters = {};

        if (query.email) {
            filters.email = query.email;
        }

        return await userRepository.getAll(filters);
    }

    async getUsersWithPagination(page, limit, query = {}) {
        const offset = (page - 1) * limit;
        const filters = {};

        if (query.email) {
            filters.email = query.email;
        }

        const result =
            await userRepository.getAllWithPagination(
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

    async getUserById(id) {
        const user = await userRepository.getById(id);

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }

    async updateUser(id, payload) {
        if (payload.password) {
            payload.password = await bcrypt.hash(
                payload.password,
                10
            );
        }

        const user = await userRepository.update(
            id,
            payload
        );

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }

    async deleteUser(id) {
        const deleted = await userRepository.delete(id);

        if (!deleted) {
            throw new Error("User not found");
        }

        return {
            message: "User deleted successfully"
        };
    }
}
module.exports = new UserService();