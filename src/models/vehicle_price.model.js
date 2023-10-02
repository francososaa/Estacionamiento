module.exports = (sequelize, DataTypes) => {
    const VehiclePrice = sequelize.define("vehicle_price", {
        vehiclePriceId: {
            type: DataTypes.INTEGER,
            allowNull:  false,
            primaryKey: true,
            autoIncrement: true,
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