import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";



export const Transfer = sequelize.define('transferencias', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    emisor: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    receptor: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0
        }
    }
}, {
    timestamps: true
}
)