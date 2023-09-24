module.exports = (sequelize, DataTypes) => {
    const VehicleType = sequelize.define("vehicle_type", {
        vehicleTypeId: {
            type: DataTypes.INTEGER,
            allowNull:  false,
            primaryKey: true,
            autoIncrement: true,
            field: "vehicle_type_id",
        },
        description: {
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
        tableName: "vehicle_type"
    });

    return VehicleType;
}; 