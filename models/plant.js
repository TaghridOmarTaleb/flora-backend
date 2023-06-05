import mongoose from "mongoose";
const { Schema, model } = mongoose;

const plantSchema = new Schema(
  {
    title: {
      type: String,
    },
    imgFromBB: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
    },
    like: {
      type: Boolean,
      default: false,
    },
    fav: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "plants",
    timestamps: true,
  }
);

const Plant = model("Plant", plantSchema);
export default Plant;
