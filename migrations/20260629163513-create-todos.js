'use strict';


const up = async (queryInterface, sequelize) => {
    const tableName = "todos";

    const tableExists = await queryInterface
        .describeTable(tableName)
        .then(() => true)
        .catch(() => false);

    const columnsToAdd = {
        id: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: sequelize.STRING,
            allowNull: false
        },
        description: {
            type: sequelize.TEXT
        },
        completed: {
            type: sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        dueDate: {
            type: sequelize.DATE
        },
        userId: {
            type: sequelize.UUID,
            allowNull: false
        },
        createdAt: {
            type: sequelize.DATE,
            allowNull: false
        },
        updatedAt: {
            type: sequelize.DATE,
            allowNull: false
        }
    };

    if (!tableExists) {
        await queryInterface.createTable(tableName, columnsToAdd);
    } else {
        const tableDefinition = await queryInterface.describeTable(tableName);

        for (const column of Object.keys(columnsToAdd)) {
            if (!tableDefinition[column]) {
                await queryInterface.addColumn(
                    tableName,
                    column,
                    columnsToAdd[column]
                );
            }
        }
    }
};
const down = async (queryInterface) => {
    const tableName = "todos";

    const tableExists = await queryInterface
        .describeTable(tableName)
        .then(() => true)
        .catch(() => false);

    if (tableExists) {
        await queryInterface.dropTable(tableName);
        console.log(`Dropped table "${tableName}"`);
    }
};
module.exports = {
    up,
    down
};