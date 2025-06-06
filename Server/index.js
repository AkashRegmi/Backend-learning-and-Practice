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
      message: error.message || "Internal Server Error",
    });
  }
});

app.get("/books",  async (req, res) => {
 const StoredBooks = await Books.find({});
 if(!StoredBooks || StoredBooks.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "No books found in the database",
    });
  }
  res.status(200).json({
    status: "success",
    message: "Books retrieved successfully",
    data: StoredBooks,
  });
});

//get book by id 
app.get("/books/:id",async(req,res)=>{
  console.log(req.params);
  const{ id }=req.params;
  if(!id){
    return res.status(400).json({
      status:"fail",
      message:"id is required"
    })
  }
  try {
    const specificBook = await Books.findById(id);
    if (!specificBook) {
      return res.status(404).json({
        status: "fail",
        message: "Book not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Book retrieved successfully",
      data: specificBook,
    });
    
  } catch (error) {
    console.error("Error retrieving book:", error.message);
    res.status(500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
    
  }
})

// Delete the book by id 
app.delete("/books/delete/:id", async(req,res)=>{
  const {id } = req.params;
  if(!id){
    return res.status(400).json({
      status: "fail",
      message: "id is required to delete the book",
    });
    };
    try {
      const newBooks = await Books.findByIdAndDelete(id);
    
      if (newBooks.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "No books found with the provided id",
        });
      }
      res.status(200).json({
        status:"success",
        message :`Book with id ${id} deleted successfully`,
        data:newBooks
      })
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message || "Internal Server Error",
      });
    }
  })

// Update the book by id
app.put("/books/update/:id",(async(req,res)=>{
  const {id} = req.params;
  const { title, author, price } = req.body;
  if (!id || !title || !author || !price) {
    return res.status(400).json({
      status: "fail",
      message: "id, title, author and price are required",
    });
  }
  try {
    const updatedBook = await Books.findByIdAndUpdate(
      id,
      { title, author, price },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({
        status: "fail",
        message: "Book not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: `Book with id ${id} updated successfully`,
      data: updatedBook,
    });
  } catch (error) {
    console.error("Error updating book:", error.message);
    res.status(500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
}))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
