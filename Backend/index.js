const express=require('express');
const app=express();
const mongoose=require('mongoose');
const { createProduct } = require('./controller/Product');
const productRouter=require('./routes/Products');
const categoriesRouter=require('./routes/Category');
const brandsRouter=require('./routes/Brands');
const port=8080;
const cors=require('cors');
//middlewares
app.use(cors({
    exposedHeaders:['X-Total-Count']
}));
app.use(express.json());
app.use('/products',productRouter.router);
app.use('/brands',brandsRouter.router);
app.use('/categories',categoriesRouter.router);
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