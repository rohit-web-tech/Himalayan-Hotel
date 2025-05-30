import ApiError from "../lib/apiError.js";
import ApiResponse from "../lib/apiResponse.js";
import asyncHandler from "../lib/asyncHandler.js";
import { Inventory, Item } from "../models/inventory.model.js";

export const AddInventory = asyncHandler(async (req, res) => {

    const { name, price } = req?.body;
    const image = req?.file;

    console.log(name, image, price)

    if (!name || !price || !image) {
        throw new ApiError(400, "All fields are required !!");
    }

    const newInventory = await Item.create({
        name,
        price,
        image: image?.filename
    });

    await newInventory.save();

    return res
        .status(201)
        .json(
            new ApiResponse(201, newInventory, "Inventory is added successfully !!")
        )

});

export const EditInventory = asyncHandler(async (req, res) => {

    const { newName, _id, price, image } = req?.body;
    const updatedImage = req?.file;

    if (!newName || !_id || !price || (!image && !updatedImage)) {
        throw new ApiError(400, "All fields are required !!");
    }

    const inventory = await Item.findByIdAndUpdate(
        _id,
        {
            $set: {
                name: newName,
                price,
                image: updatedImage ? updatedImage.filename : image
            }
        },
        {
            $new: true
        }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(200, inventory, "Inventory is edited successfully !!")
        )

});

export const deleteInventory = asyncHandler(async (req, res) => {

    const { _id } = req?.body;

    if (!_id) {
        throw new ApiError(400, "Inventory Id is required !!");
    }

    const inventory = await Item.findByIdAndDelete(
        _id,
        {
            $new: true
        }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(200, inventory, "Inventory is deleted successfully !!")
        );

});

export const fetchInventories = asyncHandler(async (req, res) => {

    const result = await Item.find({});

    return res
        .status(200)
        .json(
            new ApiResponse(200, result, "Inventories data fetched data successfully !!")
        );

});

export const fetchAllInventories = asyncHandler(async (req, res) => {

    const result = await Inventory.aggregate([
        {
            $lookup: {
                from: "rooms",
                localField: "room",
                foreignField: "_id",
                as: "roomDetails"
            }
        },
        {
            $unwind: "$roomDetails"
        },
        {
            $group: {
                _id: "$item",
                totalQuantity: {
                    $sum: {
                        $multiply: ["$quantity", "$roomDetails.totalRooms"]
                    }
                }
            }
        },
        {
            $lookup: {
                from: "items",
                localField: "_id",
                foreignField: "_id",
                as: "itemDetails"
            }
        },
        {
            $unwind: "$itemDetails"
        },
        {
            $addFields: {
                name: "$itemDetails.name",
                image: "$itemDetails.image",
                price: "$itemDetails.price",
                totalPrice: { $multiply: ["$totalQuantity", "$itemDetails.price"] }
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                image: 1,
                price: 1,
                totalQuantity: 1,
                totalPrice: 1
            }
        }
    ]);



    return res
        .status(200)
        .json(
            new ApiResponse(200, result, "Inventories data fetched data successfully !!")
        );

});

export const clubInventoryToRoom = asyncHandler(async (req, res) => {

    const { inventory, quantity, room } = req?.body;

    if (!inventory || !quantity || !room) {
        throw new ApiError(400, "All fields are required !!");
    }

    const newInventory = await Inventory.create({
        item: inventory,
        quantity,
        room
    });

    await newInventory.save();

    return res
        .status(201)
        .json(
            new ApiResponse(201, newInventory, "Inventory added to room successfully !!")
        );

});

export const editInventoryClubbedToRoom = asyncHandler(async (req, res) => {

    const { inventory, room, quantity, _id } = req?.body;

    if (!inventory || !room || !quantity || !_id) {
        throw new ApiError(400, "All fields are required !!");
    }

    const editedInventory = await Inventory.findByIdAndUpdate(
        _id,
        {
            $set: {
                item: inventory,
                room,
                quantity
            }
        },
        {
            $new: true
        }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(200, editedInventory, "Inventory edited successfully !!")
        );

});

export const deleteInventoryClubbedToRoom = asyncHandler(async (req, res) => {

    const { _id } = req?.body;

    if (!_id) {
        throw new ApiError(400, "Inventory Id is required !!");
    }

    const inventory = await Inventory.findByIdAndDelete(
        _id,
        {
            $new: true
        }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(200, inventory, "Inventory deleted successfully !!")
        );

});

export const getRoomInventory = asyncHandler(async (req, res) => {

    const { id } = req?.params;

    if (!id) {
        throw new ApiError(400, "Room id is required !!");
    }

    const inventories = await Inventory.find({ room: id })
        .populate("item")
        .lean(); 

    const result = inventories.map(inv => {
        return {
            name: inv.item?.name,
            image: inv.item?.image,
            price: inv.item?.price,
            quantity: inv.quantity,
            _id: inv?._id,
        }
    })

    return res
        .status(200)
        .json(
            new ApiResponse(200, result, "Inventories data is fetched successfully !!")
        );

})