import express from 'express'
const router = express.Router()
import { Authenticated } from '../middlewares/auth.middleware.js'
import { adminOnly } from '../middlewares/admin.middleware.js'
import { addProduct, deleteProductById, getProduct, getProductById, updateProductById,filterProducts} from '../controllers/product.controller.js'

// add product
router.post('/add',Authenticated,adminOnly,addProduct)
// all product
router.get('/all',getProduct)
// filter product
router.get("/filter", filterProducts);
// get product by Id 
router.get('/:id',Authenticated,getProductById)
// update product by Id
router.put('/:id',Authenticated,adminOnly,updateProductById)
// delete product
router.delete('/:id',Authenticated,adminOnly,deleteProductById)
  
export default router