const sequelize = require("../config/database");

const UserModel = require("./user");
const TodoModel = require("./todo");

const db = {
    sequelize,
    UserModel,
    TodoModel
};

// Setup associations
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;