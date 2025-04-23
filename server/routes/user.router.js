import express from 'express'
const router = express.Router()
import {userRegister,userLogin,userDetails,userProfile } from '../controllers/user.controller.js'
import  {Authenticated} from '../middlewares/auth.middleware.js'

router.post('/register',userRegister)
router.post('/login',userLogin)
router.get('/userdetails',userDetails)
// user profile
router.get('/profile',Authenticated,userProfile)

export default router