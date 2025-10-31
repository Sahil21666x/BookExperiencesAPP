import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  experienceId: { type: Number, required: true },
  slotId: { type: Number, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: String, required: true },
  promoCode: { type: String },
  discount: { type: String, default: "0" },
  bookingStatus: { type: String, required: true, default: "confirmed" },
  createdAt: { type: Date, default: Date.now },
});

export const BookingModel = mongoose.model("Booking", bookingSchema);
