import mongoose from "mongoose";
const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      enum: [
        "Indoor",
        "Outdoor",
        "Coton",
        "Aloevera",
        "Medical",
        "Cosmetic",
        "Garden",
        "perfume"
      ],
      required: [true, "Please add a category"],
    },
  },
  {
    collection: "categories",
  }
);

const Category = model("Category", categorySchema);
export default Category;
