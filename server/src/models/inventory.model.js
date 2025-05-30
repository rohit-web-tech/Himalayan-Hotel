import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "Item"
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    image : {
        type : String,
        required : true,
        default : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
    }
});

const Item = mongoose.model("Item", itemSchema);

const inventorySchema = mongoose.Schema({
    item: {
        type: mongoose.Schema.ObjectId,
        ref: "Item",
        require: true
    },
    quantity: {
        type: Number,
        required: true
    },
    room: {
        type: mongoose.Schema.ObjectId,
        ref: "Room",
        require: true
    }
}, {
    timestamps: true
});

const Inventory = mongoose.model("Inventory", inventorySchema);

export { Item, Inventory };