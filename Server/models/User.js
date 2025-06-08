const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

function isStrongPassword(password) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(password);
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      lowercase:true,
      trim: true,
      minLength: [3, "the minimun length of name must be 3 Character"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Minimum length of the Passwors Should be 6 Character "],
      validate:{
        validator:isStrongPassword,
        message: "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
      }
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "{VALUE} is not valid Status",
      },
      default: "user",
    },
  },
  { timeStamp: true }
);
// 🔐 Hash password after validation, before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const user = mongoose.model("User", userSchema);
module.exports=user;
