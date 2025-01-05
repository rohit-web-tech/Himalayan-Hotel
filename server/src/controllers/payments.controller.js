import Razorpay from "razorpay";
import asyncHandler from "../lib/asyncHandler.js";
import ApiError from "../lib/apiError.js";
import ApiResponse from "../lib/apiResponse.js";
import Payment from "../models/payment.model.js"
import crypto from "crypto";

const razorpay = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
});

export const createPaymentOrder = asyncHandler(async (req, res) => {

    const { amount, currency } = req?.body;

    if (!amount || !currency) {
        throw new ApiError(400, "Amount and currency is required !!");
    }

    const options = {
        amount: amount * 100,
        currency: currency ?? "INR",
        receipt: "order_rcptid_11"
    };

    razorpay.orders.create(options, (err, order) => {

        try {

            if (err) {
                throw new ApiError(500, "Can't create payment at this time. Please try again later !!");
            }
    
            return res
                .status(201)
                .json(
                    new ApiResponse(
                        201,
                        {
                            ...order,
                            key_id: process.env.key_id,
                            email: req?.user?.email ?? "guest@guest.com",
                            contact: req?.user?.contact ?? "0000099999",
                            name: req?.user?.name ?? "Guest"
                        },
                        "Payment order created successfully !!",
                    )
                );
        } catch (error) {

            return res
                .status(error?.status || error?.statusCode || 500)
                .json(
                    new ApiError(
                        error?.status || error?.statusCode || 500,
                        error?.message || "Something went wrong while creating payment order !!"
                    )
                );
                
        }

    });

});

export const verifyPayment = asyncHandler(async (req, _, next) => {

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req?.body?.response;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        throw new ApiError(400, "Invalid payment from required!!");
    }

    const isPaymentAlreadyExist = await Payment.findOne({
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        signature: razorpay_signature
    });

    if (isPaymentAlreadyExist) {
        throw new ApiError(401, "Invalid payment verification request. Payment already exist!!")
    }

    const hmac = crypto.createHmac("sha256", process.env.key_secret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const expectedSignature = hmac.digest('hex');

    const isPaymentAuthentic = expectedSignature === razorpay_signature;

    if (!isPaymentAuthentic) {
        throw new ApiError(400, "Invalid payment from authentication !!");
    }

    const razorpayPayment = await razorpay.payments.fetch(razorpay_payment_id);

    if (!razorpayPayment) {
        throw ApiError(400, "Invalid payment from fetch !!");
    }

    const payment = await Payment.create({
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        signature: razorpay_signature,
        status: razorpayPayment?.status,
        currency: razorpayPayment?.currency ?? "INR",
        amount: razorpayPayment?.amount ?? 0,
        method: razorpayPayment?.method ?? "card",
        email: req?.user?.email ?? "guest@guest.com",
        contact: req?.user?.contact ?? "0000099999"
    });

    await payment.save();

    req.payment = payment;
    req.body.paymentMode = "prepaid";

    next();

});