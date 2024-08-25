import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    contact : {
        type : String ,
        require : true
    },
    email:{
        type : String,
        require : true 
    },
    address:{
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

const contactModel = mongoose.model("Contact",contactSchema) ;

export default contactModel ;