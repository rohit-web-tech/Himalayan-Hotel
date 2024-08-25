import mongoose from "mongoose" ;
import "dotenv/config.js" ;
const db_url = process.env.db_url ;

connectDb().catch(err => console.log(err));

async function connectDb() {
    await mongoose.set("strictQuery", false);
    await mongoose.connect(db_url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    console.log("db connected");
}

export default connectDb ;