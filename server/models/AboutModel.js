import mongoose from "mongoose";

const aboutSchema = mongoose.Schema({
    title : {
        type : String ,
        require : true
    },
    description:{
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

const aboutModel = mongoose.model("About",aboutSchema) ;

export default aboutModel ;