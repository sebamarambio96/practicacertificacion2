import { User } from "../models/User.js"
import jwt from 'jsonwebtoken'
const secret = 'esteeselsecreto'

//GET all user info
export async function getUsersInfo(req, res) {
    //Recorre todas las filas y genera un arreglo
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//GET user info
export async function getUserInfo(req, res) {
    try {
        const token = req.headers['x-access-token']
        if (!token) {
            return res.status(401).json({
                auth: false,
                message: 'No estás autorizado'
            })
        }
        const decoded = jwt.verify(token, secret)
        console.log(decoded)
        const { id } = decoded
        const user = await User.findOne({
            where: {
                id
            }
        })
        if (!user) return res.status(404).json({ message: 'Usuario no existe' })

        res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//ADD new user
export async function addUser(req, res) {

    try {
        let { name, balance } = req.body
        balance= parseInt(balance)
        console.log(balance)
        //Validate email
        const user = await User.findOne({
            where: {
                name
            }
        })
        if (user) return res.status(401).json({
            auth: false,
            message: 'Nombre ya registrado'
        })
        const newUser = await User.create({
            name,
            balance
        })

        res.status(201).json({ auth:true, newUser })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

/* //Login
export async function login(req, res) {
    const { email, password } = req.body
    try {
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) return res.status(404).json({
            auth: false,
            message: 'Usuario no existe'
        })
        const passValid = await User.validatePass(password, user.password)
        if (!passValid) {
            return res.status(401).json({
                auth: false,
                message: 'Contraseña incorrecta'
            })
        }
        //Create token
        const token = jwt.sign({ id: user.id }, secret, {
            expiresIn: 60 * 60 * 24
        })
        res.status(201).json({ auth: true, token: token })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
} */

/* //Change status
export async function changeStatus(req, res) {
    try {
        console.log(req.body)
        const user = await User.findByPk(req.params.id)
        user.status = req.body.status
        await user.save()
        res.status(201).json({ auth: true, message: "Estado cambiado" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
} */

export async function modifyUserInfo(req, res) {
    try {
        const { id, name, balance } = req.body
        const user = await User.findByPk(id)
        user.name = name
        user.balance = req.body.balance
        await user.save()
        res.status(201).json({ auth: true, message: "Perfil actualizado" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//DELETE a car
export async function deleteUser(req, res) {
    try {
        const user = await User.findByPk(req.params.id)
        if (!user) return res.status(404).json({ message: 'Este usuario no existe'})
        //busca y elimina el dato deseado
        const deleteuser = await User.destroy({
            where: {
                id:req.params.id
            }
        })
        //204 no develve nada pero todo fue bien
        res.status(200).json({auth:true, deleteuser})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}