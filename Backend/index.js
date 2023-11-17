const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');

const { createProduct } = require('./controller/Product');
const productRouter=require('./routes/Products');
const categoriesRouter=require('./routes/Category');
const brandsRouter=require('./routes/Brands');
const usersRouter=require('./routes/User');
const authRouter=require('./routes/Auth');
const cartRouter=require('./routes/Cart');
const orderRouter=require('./routes/Order');
const port=8080;

//middlewares
app.use(cors({
    exposedHeaders:['X-Total-Count']
}));
app.use(express.json());
app.use('/products',productRouter.router);
app.use('/brands',brandsRouter.router);
app.use('/categories',categoriesRouter.router);
app.use('/users',usersRouter.router);
app.use('/auth',authRouter.router);
app.use('/cart',cartRouter.router);
app.use('/orders',orderRouter.router);
main().catch(err => console.log(err));
  async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
    console.log('database is connected');
  }

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post('/products',createProduct);
app.listen(port,()=>
{
    console.log("server is running on port 8080");
});