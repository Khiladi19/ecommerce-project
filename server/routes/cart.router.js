import express from 'express'
import { addToCart, clearCart, decreaseProductQty, removeaProductFromCart, userCart,increaseProductQty } from '../controllers/cart.controller.js'
const router = express.Router()

import  {Authenticated} from '../middlewares/auth.middleware.js'
// add cart Item
router.post('/add',Authenticated,addToCart)
// get user cart 
router.get('/user',Authenticated,userCart)
// remove product form cart 
router.delete('/remove/:productId',Authenticated,removeaProductFromCart)
// clearcart 
router.delete('/clear',Authenticated,clearCart)
// decrese items qtu
router.post('/--qty',Authenticated,decreaseProductQty)
// increase item qty
router.post('/ing',Authenticated,increaseProductQty)

export default router