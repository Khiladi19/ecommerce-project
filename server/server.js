import express from 'express'
import connectionToDB from './conf/db.js'
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000


const allowedOrigins = [
  // "http://localhost:5173",
  "https://ecommerce-frontend-wh22.onrender.com",  
];

app.use(cors({
  origin:allowedOrigins,
  methods:["GET","POST","PUT","DELETE"],
  credentials:true, 
}))
// Middleware
app.use(cors())        
app.use(express.json())

import userRouter from './routes/user.router.js'
import productRouter from './routes/product.router.js'
import cartRouter from './routes/cart.router.js'
import addressRouter from './routes/address.router.js'
import orderRouter from './routes/order.router.js'

import paymentRoutes from './routes/payment.router.js';

// Routes
app.use('/api/user', userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/address',addressRouter)
app.use('/api/payment', paymentRoutes);

app.use('/api/orders',orderRouter)


app.get('/ping', (req, res) => res.send('Hello Kapil Yadav'))

app.listen(PORT, async () => {
  await connectionToDB()
  console.log(`Server is running at http://localhost:${PORT}`)
})


