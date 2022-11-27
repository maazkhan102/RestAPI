const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

// Here we are connecting Database
mongoose.connect("mongodb://localhost:27017/Sample",{useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
    console.log("Connected with Mongodb")
}).catch((err) => {
    console.log(err)
})

// ye 2 lines may bodyParser and express ki lambi hai 
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())


// Here We are creating the product Schema
const productSchema=new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    image:String
})


// Here we have created a model/collection and we have pass ProductSchema in it
const Product= new mongoose.model("Product", productSchema)

// Now we are creating the API of create product using post method
app.post("/api/v1/product/new",async(req,res)=>{
    const product = await Product.create (req.body);
    res.status(201).json({
        success:true,
        product
    })
})


// Here we are creating the API of Read product using Get method
app.get("/api/v1/Products",async(req,res) => {
    const products = await Product.find ();
    res.status(200).json({
        success:true,
        products
    })
})

// Here we are creating the API of Update product using Put method
app.put("/api/v1/product/:id",async(req,res) => {
    let product = await Product.findByIdAndUpdate (req.params.id,req.body,{
        new:true,
        useFindAndModify:false,
        runValidators:true
    });
    res.status(200).json({
        success:true,
        product
    })
})


// Here we are creating the API of Delete product using Delete method
app.delete("/api/v1/product/:id",async(req,res) => {
    const product = await Product.findById (req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    await product.remove();

    res.status(200).json({
        success:true,
        message:"Product is deleted successfully"
    })
})



app.listen(4500,() =>{
    console.log("server is working http://localhost:4500")
})