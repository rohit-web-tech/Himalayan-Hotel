import asyncHandler from "../lib/asyncHandler.js";
import Home from "../models/home.model.js";
import ApiResponse from "../lib/apiResponse.js";

export const getHome = asyncHandler(async (_, res) => {
    const home = await Home.findOne({});
    res
    .status(200)
    .json(
        new ApiResponse(200,home,"Home details fetched successfully!!")
    );
})

export const setHome = asyncHandler(async (req, res) => {
    const {title, imageUrl , subtitle} = req.body;
    await Home.deleteMany({});
    const home = new Home({title, imageUrl , subtitle});
    await home.save();
    res
    .status(201)
    .json(
        new ApiResponse(201,home,"Home details edited successfully!!")
    );
})