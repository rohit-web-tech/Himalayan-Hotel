import mongoose from "mongoose";

const homeSchema = mongoose.Schema({
    title : {
        type : String ,
        require : true
    },
    subtitle:{
        type : String,
        require : true 
    },
    imageUrl : {
        type : String ,
        require : true 
    }
},{
    timestamps : true 
})

const Home = mongoose.model("Home",homeSchema) ;

export default Home ;