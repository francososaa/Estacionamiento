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
            type: DataTypes.DATE,
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
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: "user_id",
        },
    },
    {
        tableName: "reservation"
    });

    return Reservation;
};