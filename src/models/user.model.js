const bcryptjs = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        userId: {
            type: DataTypes.UUID,
            allowNull:  false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            field: "user_id",
        },
        dni: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            field: "is_active",
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
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "role_id",
        },
    },
    {
        tableName: "user",
        hooks: {
            beforeCreate: async function (user) {
                const salt = bcryptjs.genSaltSync(10);
                user.password = await bcryptjs.hashSync(user.password, salt)
            }
        }
    });

    return User;
};