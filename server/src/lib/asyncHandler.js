import ApiError from "./apiError.js"

const asyncHandler = (cb) => async(req,res,next)=>{
    try {
        await cb(req,res,next);
    } catch (error) {
        res
        .status(error.status || 500)
        .json(
            new ApiError(error.status || 500 , error.message || "Something went wrong !!")
        )
    }
}

export default asyncHandler ;