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
    const {  title, image, description } = req.body;
    const newImage = req?.file ;

    if(!title || !description || (!newImage && !image)) {
        throw new ApiError(400,"All fields are required !")
    }

    await About.deleteMany({});

    const about = new About({ title, imageUrl : newImage?.filename ? newImage.filename : image, description });

    await about.save();

    res
    .status(201)
    .json(
        new ApiResponse(201,about,"About details edited successfully!!")
    );
})