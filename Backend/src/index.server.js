const express=require('express')
const app=express()
const env=require('dotenv')
const mongoose=require('mongoose')
const authRouter=require('./routes/auth')
const adminRouter=require('./routes/admin/auth')
const categoryRouter=require('./routes/Category')
const productRouter = require('./routes/product')
const initialDataRoutes=require('./routes/admin/initialData')
const pageRoutes=require('./routes/admin/page')
const cartRouter=require('./routes/cart')
const addressRoutes = require("./routes/address");
const orderRoutes = require('../src/routes/order')
const adminOrderRoute =require('./routes/admin/order.routes')
const path=require('path')
const cors =require('cors')
//environment variable or constant
env.config()
//connetion to mongoose
mongoose.set('strictQuery', false);
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.ijrkit9.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`,
    {useNewUrlParser:true,
    useUnifiedTopology:true}
    ).then(()=>{
        console.log("database is connected");
    })
    
app.use(express.json());
app.use(cors())
app.use('/public',express.static(path.join(__dirname,'uploads')))
app.use('/api',authRouter)
app.use('/api',adminRouter)
app.use('/api',categoryRouter)
app.use('/api',productRouter)
app.use('/api',cartRouter)
app.use('/api',initialDataRoutes)
app.use("/api", addressRoutes);
app.use('/api',pageRoutes);
app.use('/api',orderRoutes)
app.use('/api',adminOrderRoute)
app.listen(process.env.PORT,()=>{
    console.log(`server is running ${process.env.PORT}`);
})