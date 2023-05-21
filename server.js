const express = require("express");
const app = express();


//routes
app.get("/" ,(Req , res) => {
    res.send("hello node api")
}
    
)

app.listen(3000,()=>{
    console.log("NODE API app is running on port 3000")
})
