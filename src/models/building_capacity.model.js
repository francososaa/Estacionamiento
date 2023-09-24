module.exports = (sequelize, DataTypes) => {
    const BuildingCapacity = sequelize.define("building_capacity", {
        buildingCapacityId: {
            type: DataTypes.INTEGER,
            allowNull:  false,
            primaryKey: true,
            autoIncrement: true,
            field: "building_capacity_id",
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        overallCapacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "overall_capacity",
        },
        overallCapacityOccupied: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "overall_capacity_occupied",
        },
        isCompleteOverallCapacity: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: "is_complete_overall_capacity",
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
        tableName: "building_capacity"
    });

    return BuildingCapacity;
};