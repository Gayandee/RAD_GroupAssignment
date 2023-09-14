import dotenv from "dotenv";
import User from "./models/userModel.js";
import Recipe from "./models/recipeModel.js";
import Diary from "./models/diaryModel.js";
import Shop from "./models/shopModel.js";
import Grocery from "./models/groceryModel.js";
import Question from "./models/questionModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const destroyData = async () => {
  try {
    await Recipe.deleteMany();
    await User.deleteMany();
    await Diary.deleteMany();
    await Shop.deleteMany();
    await Grocery.deleteMany();
    await Question.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
