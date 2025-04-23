import express from 'express'
import { addAddress, getAddress } from '../controllers/address.controller.js'
const router = express.Router()
import {Authenticated} from '../middlewares/auth.middleware.js'


// add address
router.post('/add',Authenticated,addAddress)
// get address
router.get('/get',Authenticated,getAddress)
export default router