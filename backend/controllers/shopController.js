import Shop from "../models/shopModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get logged in user shops
// @route   GET /api/shops
// @access  Private
const getShops = asyncHandler(async (req, res) => {
  const shops = await Shop.find({ user: req.user._id });
  res.json(shops);
});

//@description     Fetch single Shop
//@route           GET /api/shops/:id
//@access          Public
const getShopById = asyncHandler(async (req, res) => {
  const shop = await Shop.findById(req.params.id);

  if (shop) {
    res.json(shop);
  } else {
    res.status(404).json({ message: "Shop not found" });
  }

  res.json(shop);
});

//@description     Create single Shop
//@route           GET /api/shops/create
//@access          Private
const CreateShop = asyncHandler(async (req, res) => {
  const { name, address, email, mobile } = req.body;

  if (!name || !address || !email || !mobile) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const shop = new Shop({ user: req.user._id, name, address, email, mobile });

    const createdShop = await shop.save();

    res.status(201).json(createdShop);
  }
});

//@description     Delete single Shop
//@route           GET /api/shops/:id
//@access          Private
const DeleteShop = asyncHandler(async (req, res) => {
  const shop = await Shop.findById(req.params.id);

  if (shop.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (shop) {
    await shop.remove();
    res.json({ message: "Shop Removed" });
  } else {
    res.status(404);
    throw new Error("Shop not Found");
  }
});

// @desc    Update a shop
// @route   PUT /api/recipes/:id
// @access  Private
const UpdateShop = asyncHandler(async (req, res) => {
  const { name, address, email, mobile } = req.body;

  const shop = await Shop.findById(req.params.id);

  if (shop.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (shop) {
    shop.name = name;
    shop.address = address;
    shop.email = email;
    shop.mobile = mobile;

    const updatedShop = await shop.save();
    res.json(updatedShop);
  } else {
    res.status(404);
    throw new Error("Shop not found");
  }
});

export { getShopById, getShops, CreateShop, DeleteShop, UpdateShop };
