const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class TodoModel extends Model {
    static associate(models) {
                const { UserModel  } = models;

        // Todo belongs to one user
        TodoModel.belongsTo(UserModel, {
            foreignKey: "userId",
            as: "user"
        });
    }
}

TodoModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        title: {
            type: DataTypes.STRING,
        },

        description: {
            type: DataTypes.TEXT,
        },

        completed: {
            type: DataTypes.BOOLEAN,
        },

        dueDate: {
            type: DataTypes.DATE,
        },

        userId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "TodoModel",
        tableName: "todos",
        timestamps: true
    }
);

module.exports = TodoModel;