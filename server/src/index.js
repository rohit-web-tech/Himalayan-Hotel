import "dotenv/config.js";
import app from "./app.js";
import connectDb from "./dbconfig.js";

const PORT = process.env.PORT ;

connectDb()
.then(()=>{
    app.listen(PORT, () => {
        console.log(`😃 Server is running on port : ${PORT}`)
    })
    app.on("error",(err)=>{
        console.error(`😪 Server listening error :`,err?.message);
    })
})
.catch((err)=>{
    console.error(`😪 Database connection error :`,err?.message);
    process.exit(1);
})