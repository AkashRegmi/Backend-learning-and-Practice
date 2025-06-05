require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/database");
const mongoose = require("mongoose");

const Loggerr = require("./middleWare/custome");
const Books = require("./models/Books");
const PORT = process.env.PORT || 1000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
// for parsing application/json
// app.get("/w", (req, res) => {
//     res.send("this is the first with typing ");
// });

// app.get('/', (req, res) => {
//   console.log(req.headers);
//   res.send('Check your console');
// });
// app.get("/",Loggerr,(req,res)=>{
//   res.status(200).json({
//     status:"success",
//     message:"welcome to the home Page"
//   })
// });
// app.get("/about",Loggerr,(req,res)=>{
//   res.status(200).json({
//     status:"success",
//     message:"welcome to the about Page"
//   })
// });

// app.post("/user",(req,res)=>{
//   const {name,email}=req.body;
//   if(!name||!email){
//     return res.status(400).json({
//       status:"fail",
//       message:"name and email are required"
//     })
//   };
//   console.log(name,email)
//   res.status(200).json({
//     status:"success",
//     message:"user data received successfully",
//     data:{
//       name,
//       email
//     }
//   })
// })

app.post("/books", async(req, res) => {
  const { title, author, price } = req.body;
  if (!title || !author || !price) {
    return res.status(400).json({
      status: "fail",
      message: "id, title, author and price are required",
    });
  }

  try {
    
      const books = await Books.create({
        title,
        author,
        price,
      });
    
    res.status(200).json({
      status: "success",
      message: "Book Saved successfully in Database",
      data: {
        title,
        author,
        price,
      },
    });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to add book",
    });
  }
});

app.get("/books", (req, res) => {
  if (storedBooks.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "No books found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "Books retrieved successfully",
    data: storedBooks,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
