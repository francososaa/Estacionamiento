module.exports = (sequelize, DataTypes) => {
    const Reservation = sequelize.define("reservation", {
        reservationId: {
            type: DataTypes.UUID,
            allowNull:  false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            field: "reservation_id",
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.NOW,
            allowNull: false,
            field: "created_at",
        },
        updatedAt: {
            type: "TIMESTAMP",
            field: "updated_at",
        },
        vehicleId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: "vehicle_id",
        },
        reservationPersonDataId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: "reservation_person_data_id",
        },
    },
    {
        tableName: "reservation"
    });

    return Reservation;
};