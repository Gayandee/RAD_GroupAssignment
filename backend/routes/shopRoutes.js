import express from "express";
import {
  getShopById,
  getShops,
  CreateShop,
  DeleteShop,
  UpdateShop,
} from "../controllers/shopController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getShops);
router
  .route("/:id")
  .get(getShopById)
  .delete(protect, DeleteShop)
  .put(protect, UpdateShop);
router.route("/create").post(protect, CreateShop);

export default router;
