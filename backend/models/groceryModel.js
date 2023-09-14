import mongoose from "mongoose";

const grocerySchema = mongoose.Schema(
  {
    Heading: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    PriorityLevel: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Grocery = mongoose.model("Grocery", grocerySchema);

export default Grocery;
