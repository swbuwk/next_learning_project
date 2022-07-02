import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    cardNumber: {type: String, required: true},
    expDate: {type: String, required: true},
    CVV: {type: String, required: true},
    amount: {type: Number, required: true}
})

const PaymentModel = Object.keys(mongoose.models).includes("Payment") ? mongoose.model("Payment") : mongoose.model("Payment", paymentSchema)


export default PaymentModel