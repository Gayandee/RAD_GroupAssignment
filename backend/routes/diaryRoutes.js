import express from "express";
import {
    getDiaryById,
    getDiaries,
    CreateDiary,
    DeleteDiary,
    UpdateDiary,
} from "../controllers/diaryController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getDiaries);
router
    .route("/:id")
    .get(getDiaryById)
    .delete(protect, DeleteDiary)
    .put(protect, UpdateDiary);
router.route("/create").post(protect, CreateDiary);

export default router;
