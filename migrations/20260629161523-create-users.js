"use strict";

const up = async (queryInterface, sequelize) => {
    const tableName = "users";

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

        firstName: {
            type: sequelize.STRING(100),
        },

        lastName: {
            type: sequelize.STRING(100),
        },

        username: {
            type: sequelize.STRING(100),
        },

        email: {
            type: sequelize.STRING(150),
            unique: true
        },

        password: {
            type: sequelize.STRING(255),
        },

        phone: {
            type: sequelize.STRING(20),
        },
        createdAt: {
            type: sequelize.DATE,
            allowNull: false,
        },

        updatedAt: {
            type: sequelize.DATE,
            allowNull: false,
        }
    };

    if (!tableExists) {
        await queryInterface.createTable(tableName, columnsToAdd);
    } else {
        const tableDefinition = await queryInterface.describeTable(tableName);

        for (const column of Object.keys(columnsToAdd)) {
            const columnToAdd = columnsToAdd[column];
            const tableColumn = columnToAdd.field || column;

            if (!tableDefinition[tableColumn]) {
                await queryInterface.addColumn(
                    tableName,
                    tableColumn,
                    columnToAdd
                );
            }
        }
    }
};

const down = async (queryInterface) => {
    const tableName = "users";

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