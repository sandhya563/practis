const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class UserModel extends Model {
    static associate(models) {
         const { TodoModel  } = models;
        // One user has many todos
        UserModel.hasMany(TodoModel, {
            foreignKey: "userId",
            as: "todos",
        });
    }
}

UserModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        firstName: {
            type: DataTypes.STRING,
        },

        lastName: {
            type: DataTypes.STRING,
        },

        username: {
            type: DataTypes.STRING,

        },

        email: {
            type: DataTypes.STRING,
            unique: true,
        },

        password: {
            type: DataTypes.STRING,
        },

        phone: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize,
        modelName: "UserModel",
        tableName: "users",
        timestamps: true
    }
);

module.exports = UserModel;