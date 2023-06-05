import mongoose from "mongoose";
const { Schema, model } = mongoose;

const testimonialSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add your first name"],
      trim: true,
      maxlength: [30, "The username cannot be more than 30 characters"],    },
    lastName: {
      type: String,
      required: [true, "Please add your last name"],
      trim: true,
      maxlength: [30, "The username cannot be more than 30 characters"],
    },

   testimonial: {
      type: String,
      required: [true, "Please add a testimonial"],
      maxlength: [500, "A testimonial cannot be more than 500 characters"],
      minlength: [2, "A testimonial cannot be less than 2 characters"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please provide a rating between 1 and 5"],
    },
    designation: {
      type: String,
      required: [true, "Please add your designation"],
      trim: true,
    },
    created: {
      type: Date,
      default: Date.now,
    },
    imgFromBB : {
      type: String,
    }
  },

  {
    collection: "testimonials",
    timestamps: true,
  }
);

const Testimonial = model("Testimonial", testimonialSchema);
export default Testimonial;
