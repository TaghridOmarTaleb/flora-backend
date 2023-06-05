import mongoose from "mongoose";
const { Schema, model } = mongoose;

const messageSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add your first name"],
      trim: true,
      maxlength: [30, "The username cannot be more than 30 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Please add your last name"],
      trim: true,
      maxlength: [30, "The username cannot be more than 30 characters"],
    },

    message: {
      type: String,
      required: [true, "Please add a message"],
      maxlength: [500, "The message cannot be more than 500 characters"],
    },
    phone: {
      type: String,
      // match: [
      //   /^\+\d{2}\s\d{3}\s\d{3}\s\d{2}$/,
      //   "Please add a valid phone number in the format +01 234 567 89",
      // ],
    },
    email: {
      type: String,
      required: [true, "Please add your email"],
      match: [/\S+@\S+\.\S+/, "Please add a valid email address"],
    },
    created: {
      type: Date,
      default: Date.now,
    },
  },

  {
    collection: "messages",
    timestamps: true,
  }
);

const Message = model("Message", messageSchema);
export default Message;
