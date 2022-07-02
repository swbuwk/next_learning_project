import mongoose from "mongoose"
import PaymentModel from "../../Models/PaymentModel"
import dotenv from "dotenv"

dotenv.config()
mongoose.connect(`mongodb+srv://user:${process.env.DB_PASSWORD}@cluster0.yde68.mongodb.net/?retryWrites=true&w=majority`)

export default async function handler(req, res) {
  if (req.method === "POST") {
    const payment = new PaymentModel({
      ...req.body
    })
    await payment.save()
    return res.json({
      requestId: payment._id,
      amount: payment.amount
    })
  }
  return res.status(404).json({message: "POST request only"})
}
