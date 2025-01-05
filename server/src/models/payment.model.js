import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
    paymentId: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    signature: {
        type: String
    },
    status: {
        type: String,
        enum: ['created', 'authorized', 'captured', 'failed', 'refunded'],
        default: 'created'
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        dfault: 'INR'
    },
    method: {
        type: String
    },                 
    email: {
        type: String
    },
    contact: {
        type: String
    },
    refundId: {
        type: String
    }
}, {
    timestamps: true
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;