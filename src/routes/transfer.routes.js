import { Router } from "express";
import { getTransfers, postTransfer} from "../controllers/transfer.controllers.js";

const router = Router()

//GET profile
router.get('/transferencias', getTransfers)

//User Info
router.post('/transferencias', postTransfer)


export default router