const express = require("express");
const  mongoose = require("mongoose")
const Product = require('./models/productModel')
const app = express();

app.use(express.json())
//routes
app.get("/" ,(Req , res) => {
    res.send("hello node ")
}
    
)
app.get("/all" ,async(Req , res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
    
)

app.get("/all/:id" ,async(req , res) => {
    try {
        const {id} = req.params;
        const products = await Product.findById(id);
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
    
)

app.post("/product",async(req,res)=>{
    try{
     const product = await Product.create(req.body)
     res.status(200).json(product)
    }
    catch(error){
      console.log(error.message);
      res.status(500).json({message: error.message})
    }
})

app.put("/all/:id" , async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body)
        if(!product){
            return res.status(404).json({message:`cannot find anything in db with ${id}`})
        }
        const Updatedproduct = await Product.findByIdAndUpdate(id,req.body)
        res.status(200).json(Updatedproduct)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.connect("mongodb+srv://godhand:Ilyas.123@ilyasapi.qahrnea.mongodb.net/NodeAPI?retryWrites=true&w=majority")
.then(()=>{
    console.log("CONNECT TO MONGODB")
}).catch((ERREUR)=>
console.log(ERREUR))

app.listen(3000,()=>{
    console.log("NODE API app is running on port 3000")
})