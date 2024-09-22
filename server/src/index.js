import "dotenv/config.js";
import app from "./app.js";
import connectDb from "./dbconfig.js";
import ApiResponse from "./lib/apiResponse.js";

const PORT = process.env.PORT;

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`😃 Server is running on port : ${PORT}`)
        })
        app.on("error", (err) => {
            console.error(`😪 Server listening error :`, err?.message);
        })

        app.get("/", (_, res) => {
            res.json(
                new ApiResponse(
                    200,
                    [],
                    "Welcome to himalayan hotel's server !!`"
                )
            )
        })
    })
    .catch((err) => {
        console.error(`😪 Database connection error :`, err?.message);
        process.exit(1);
    })