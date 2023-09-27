module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define("role", {
        roleId: {
            type: DataTypes.INTEGER,
            allowNull:  false,
            primaryKey: true,
            autoIncrement: true,
            field: "role_id",
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "created_at",
        },
        updatedAt: {
            type: "TIMESTAMP",
            field: "updated_at",
        },
    },
    {
        tableName: "role",
    });

    return Role;
};