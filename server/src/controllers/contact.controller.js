import asyncHandler from "../lib/asyncHandler.js";
import Contact from "../models/contact.model.js";
import ApiResponse from "../lib/apiResponse.js";

export const getContact = asyncHandler(async (_, res) => {
    const contact = await Contact.findOne({});
    res
    .status(200)
    .json(
        new ApiResponse(200,contact,"Contact details fetched successfully!!")
    );
})

export const setContact = asyncHandler(async (req, res) => {
    const {contact, email , address,imageUrl} = req.body;
    await Contact.deleteMany({});
    const contactDetails = new Contact({contact, email , address,imageUrl});
    await contactDetails.save();
    res
    .status(201)
    .json(
        new ApiResponse(201,contactDetails,"Contact details edited successfully!!")
    );
})