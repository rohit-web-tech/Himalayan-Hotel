import asyncHandler from "../lib/asyncHandler.js";
import About from "../models/about.model.js";
import ApiResponse from "../lib/apiResponse.js";

export const getAbout = asyncHandler(async (_, res) => {
    const about = await About.findOne({});
    res
    .status(200)
    .json(
        new ApiResponse(200,about,"About details fetched successfully!!")
    );
})

export const setAbout = asyncHandler(async (req, res) => {
    const { title, imageUrl, description } = req.body;
    await About.deleteMany({});
    const about = new About({ title, imageUrl, description });
    await about.save();
    res
    .status(201)
    .json(
        new ApiResponse(201,about,"About details edited successfully!!")
    );
})