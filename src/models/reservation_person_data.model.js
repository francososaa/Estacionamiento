module.exports = (sequelize, DataTypes) => {
    const ReservationPersonData = sequelize.define("reservation_person_data", {
        reservationPersonDataId: {
            type: DataTypes.UUID,
            allowNull:  false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            field: "reservation_person_data_id",
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
        licence: {
            type: DataTypes.STRING,
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
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: "user_id",
        },
    },
    {
        tableName: "reservation_person_data"
    });

    return ReservationPersonData;
};