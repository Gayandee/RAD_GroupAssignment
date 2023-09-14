import Grocery from "../models/groceryModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get logged in user groceries
// @route   GET /api/groceries
// @access  Private
const getGroceries = asyncHandler(async (req, res) => {
  const groceries = await Grocery.find({ user: req.user._id });
  res.json(groceries);
});

//@description     Fetch single Grocery
//@route           GET /api/groceries/:id
//@access          Public
const getGroceryById = asyncHandler(async (req, res) => {
  const grocery = await Grocery.findById(req.params.id);

  if (grocery) {
    res.json(grocery);
  } else {
    res.status(404).json({ message: "Grocery not found" });
  }

  res.json(grocery);
});

//@description     Create single Grocery
//@route           GET /api/groceries/create
//@access          Private
const CreateItem = asyncHandler(async (req, res) => {
  const { Heading, Description, PriorityLevel } = req.body;

  if (!Heading || !Description || !PriorityLevel) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const grocery = new Grocery({ user: req.user._id, Heading, Description, PriorityLevel });

    const createdGrocery = await grocery.save();

    res.status(201).json(createdGrocery);
  }
});

//@description     Delete single Grocery
//@route           GET /api/groceries/:id
//@access          Private
const ItemDone = asyncHandler(async (req, res) => {
  const grocery = await Grocery.findById(req.params.id);

  if (grocery.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (grocery) {
    await grocery.remove();
    res.json({ message: "Grocery Removed" });
  } else {
    res.status(404);
    throw new Error("Grocery not Found");
  }
});

// @desc    Update a Grocery
// @route   PUT /api/groceries/:id
// @access  Private
const UpdateItem = asyncHandler(async (req, res) => {
  const { Heading, Description, PriorityLevel } = req.body;

  const grocery = await Grocery.findById(req.params.id);

  if (grocery.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (grocery) {
    grocery.Heading = Heading
    grocery.Description = Description;
    grocery.PriorityLevel = PriorityLevel;

    const updatedGrocery = await grocery.save();
    res.json(updatedGrocery);
  } else {
    res.status(404);
    throw new Error("Grocery not found");
  }
});

export { getGroceryById, getGroceries, CreateItem, ItemDone, UpdateItem };
