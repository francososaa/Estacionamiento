module.exports = (sequelize, DataTypes) => {
    const CollectionOfTheDay = sequelize.define("collection_of_the_day", {
        collectionOfTheDayId: {
            type: DataTypes.UUID,
            allowNull:  false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            field: "collection_of_the_day_id",
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        moneyGenerated: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "money_generated",
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
        tableName: "collection_of_the_day"
    });

    return CollectionOfTheDay;
};