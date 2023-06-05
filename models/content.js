import mongoose from "mongoose";
const { Schema, model } = mongoose;

const contentSchema = new Schema(
  {
    title: String,

    content: [String],
    
    subtitle: [String],

    image: [String],
  },
  {
    collection: "contents",
  }
);

const Content = model("Content", contentSchema);
export default Content;
