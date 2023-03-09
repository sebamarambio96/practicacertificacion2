import { Transfer } from "../models/Transfer.js"
import { User } from "../models/User.js";
import { sequelize } from "../database/database.js"

//GET all user info
export async function getTransfers(req, res) {
    //Recorre todas las filas y genera un arreglo
    try {
        const data = await Transfer.findAll()
        res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export async function postTransfer(req, res) {
    //Recorre todas las filas y genera un arreglo
    const { emisor, receptor, amount } = req.body;
    console.log(req.body)
    const transaction = await sequelize.transaction();
    try {
        //Add transfer
        const newTransfer = await Transfer.create(
            {
                emisor,
                receptor,
                amount
            },
            { transaction: transaction }
        );

        const emis = await User.findByPk(emisor);
        if (!emis) return res.status(404).json({ message: 'Emisor no existe' })
        emis.balance = emis.balance - amount
        if (emis.balance<0) return res.status(401).json({
            auth: false,
            message: 'No tiene fondos suficientes'
        })
        await emis.save({ transaction: transaction });

        const recept = await User.findByPk(receptor);
        if (!recept) return res.status(404).json({ message: 'Receptor no existe' })
        recept.balance = recept.balance - amount
        await recept.save({ transaction: transaction });

        await transaction.commit();
        res.status(201).json({ auth: true, newTransfer })
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({ message: error.message });
    }
}
