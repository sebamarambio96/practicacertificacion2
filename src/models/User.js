import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Transfer } from "./Transfer.js";

export const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min:0
        }
    }
}, {
    timestamps: true
}
)

//Relacionar
User.hasMany(Transfer, {
    foreignKey: 'emisor',
    sourceKey: 'id',
})

Transfer.belongsTo(User, {
    foreignKey: 'emisor',
    targetId: 'id'
})

User.hasMany(Transfer, {
    foreignKey: 'receptor',
    sourceKey: 'id',
})

Transfer.belongsTo(User, {
    foreignKey: 'receptor',
    targetId: 'id'
})