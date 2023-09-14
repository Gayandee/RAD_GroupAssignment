import Diary from '../models/diaryModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Get logged in user diaries
// @route   GET /api/diaries
// @access  Private
const getDiaries = asyncHandler(async (req, res) => {
    const diaries = await Diary.find({ user: req.user._id });
    res.json(diaries);
})

//@description     Fetch single Diary
//@route           GET /api/diaries/:id
//@access          Public
const getDiaryById = asyncHandler(async (req, res) => {
    const diary = await Diary.findById(req.params.id);

    if (diary) {
        res.json(diary);
    } else {
        res.status(404).json({ message: "Diary not found" });
    }

    res.json(diary);
});

//@description     Create single Diary
//@route           GET /api/diaries/create
//@access          Private
const CreateDiary = asyncHandler(async (req, res) => {
    const { heading, diarybody } = req.body;

    if (!heading || !diarybody) {
        res.status(400);
        throw new Error("Please enter all diary details");
        return;
    } else {
        const diary = new Diary({ user: req.user._id, heading, diarybody });

        const createdDiary = await diary.save();

        res.status(201).json(createdDiary);
    }
});

//@desc    Update diary
//@route   PUT /api/diaries/:id
//@access  Private
const UpdateDiary = asyncHandler(async (req, res) => {
    const { heading, diarybody } = req.body;

    const diary = await Diary.findById(req.params.id);

    if (diary.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You can't perform this action");
    }

    if (diary) {
        diary.heading = heading;
        diary.diary = diary;

        const updatedDiary = await diary.save();
        res.json(updatedDiary);
    } else {
        res.status(404);
        throw new Error('Diary not found');
    }
});

//@description     Delete single Diary
//@route           GET /api/diaries/:id
//@access          Private
const DeleteDiary = asyncHandler(async (req, res) => {
    const diary = await Diary.findById(req.params.id);

    if (diary.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You can't perform this action");
    }

    if (diary) {
        await diary.remove();
        res.json({ message: "Diary Removed" });
    } else {
        res.status(404);
        throw new Error('Diary not found');
    }
});

export { getDiaries, getDiaryById, CreateDiary, UpdateDiary, DeleteDiary };
