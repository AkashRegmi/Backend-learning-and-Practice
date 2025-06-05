require("dotenv").config();
const express = require('express');
const app = express();
const Loggerr= require("./middleWare/custome")
const PORT = process.env.PORT ||1000 ;
app.use(express.json());

// app.get("/w", (req, res) => {
//     res.send("this is the first with typing ");
// });

// app.get('/', (req, res) => {
//   console.log(req.headers);
//   res.send('Check your console');
// });
app.get("/",Loggerr,(req,res)=>{
  res.status(200).json({
    status:"success",
    message:"welcome to the home Page"
  })
});
app.get("/about",Loggerr,(req,res)=>{
  res.status(200).json({
    status:"success",
    message:"welcome to the about Page"
  })
});

app.post("/user",(req,res)=>{
  const {name,email}=req.body;
  if(!name||!email){
    return res.status(400).json({
      status:"fail",
      message:"name and email are required"
    })
  };
  console.log(name,email)
  res.status(200).json({
    status:"success",
    message:"user data received successfully",
    data:{
      name,
      email
    }
  })
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


