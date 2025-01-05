import mongoose from 'mongoose';

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    adhaar: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    }
},{
    timestamps: true
});

const Customer = await mongoose.model('Customer', customerSchema);

export default Customer;