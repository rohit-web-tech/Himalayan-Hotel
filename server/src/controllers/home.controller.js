import asyncHandler from "../lib/asyncHandler.js";
import Home from "../models/home.model.js";
import ApiResponse from "../lib/apiResponse.js";
import ApiError from "../lib/apiError.js";

export const getHome = asyncHandler(async (_, res) => {

    const home = await Home.findOne({});

    res
        .status(200)
        .json(
            new ApiResponse(200, home, "Home details fetched successfully!!")
        );

})

export const setHome = asyncHandler(async (req, res) => {

    const { title, image, subtitle } = req.body;
    const newImage = req?.file ;

    if(!title || !subtitle || (!newImage && !image)) {
        throw new ApiError(400,"All fields are required !")
    }

    await Home.deleteMany({});

    const home = new Home({ title, imageUrl : newImage?.filename ? newImage.filename : image, subtitle });

    await home.save();
    res
        .status(201)
        .json(
            new ApiResponse(201, home, "Home details edited successfully!!")
        );
        
})