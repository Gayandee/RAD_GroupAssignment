import express from "express";
import {
  getGroceryById, 
  getGroceries, 
  CreateItem, 
  ItemDone, 
  UpdateItem,
} from "../controllers/groceryController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getGroceries);
router
  .route("/:id")
  .get(getGroceryById)
  .delete(protect, ItemDone)
  .put(protect, UpdateItem);
router.route("/create").post(protect, CreateItem);

export default router;