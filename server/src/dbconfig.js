import mongoose from "mongoose" ;
import "dotenv/config.js" ;
const db_url = process.env.db_url ;

async function connectDb() {
    await mongoose.set("strictQuery", false);
    await mongoose.connect(db_url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    console.log(`😁 DB connected successfully!!`);
}

export default connectDb ;