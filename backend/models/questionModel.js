import mongoose from "mongoose";

const questionSchema = mongoose.Schema(
  {
    que: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    importance: {
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

const Question = mongoose.model("Question", questionSchema);

export default Question;
