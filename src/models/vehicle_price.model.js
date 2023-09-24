module.exports = (sequelize, DataTypes) => {
    const VehiclePrice = sequelize.define("vehicle_price", {
        vehiclePriceId: {
            type: DataTypes.UUID,
            allowNull:  false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            field: "vehicle_price_id",
        },
        vehiclePrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "vehicle_price",
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
    },
    {
        tableName: "vehicle_price"
    });

    return VehiclePrice;
};