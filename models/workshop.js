import mongoose from "mongoose";

const { Schema, model } = mongoose;

const workshopSchema = new Schema(
  {
    image: String,
    title: String,
    description: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "workshops",
    timestamps: true,
  }
);

const Workshop = model("Workshop", workshopSchema);

export default Workshop;
