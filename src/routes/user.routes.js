import { Router } from "express";
import { getUserInfo, addUser, getUsersInfo, modifyUserInfo, deleteUser} from "../controllers/user.controllers.js";

const router = Router()

//GET profile
router.get('/usuarios', getUsersInfo)

//User Info
router.get('/usuario', getUserInfo)

//Modify user Info
router.put('/usuario', modifyUserInfo)

//Delete user Info
router.delete('/profile/:id', deleteUser)

//ADD new user
router.post('/usuario',addUser)

export default router