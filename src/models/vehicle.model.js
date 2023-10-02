module.exports = (sequelize, DataTypes) => {
    const Vehicle = sequelize.define("vehicle", {
        vehicleId: {
            type: DataTypes.UUID,
            allowNull:  false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            field: "vehicle_id",
        },
        license: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        model: {
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
        vehicleTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "vehicle_type_id",
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: "user_id",
        },
    },
    {
        tableName: "vehicle"
    });

    return Vehicle;
};