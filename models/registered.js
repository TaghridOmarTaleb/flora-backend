import mongoose from "mongoose";
const { Schema, model } = mongoose;

const registeredSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add your first name"],
      trim: true,
    },

    lastName: {
      type: String,
      required: [true, "Please add your password"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add your email"],
      unique: [true, "Email already used"],
      match: [/\S+@\S+\.\S+/, "Please add a valid email address"],
    },
    comment: {
      type: String,
      maxlength: [500, "The message cannot be more than 500 characters"],
      minlength: [2, "The message cannot be less than 2 characters"],
    },
    imgFromBB: {
      type: String,
    },
  },
  {
    collection: "registereds",
  }
);

const Registered = model("Registered", registeredSchema);
export default Registered;
