import mongoose from "mongoose";
const slotSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    experienceId: { type: Number, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    capacity: { type: Number, required: true },
    booked: { type: Number, required: true, default: 0 },
});
export const SlotModel = mongoose.model("Slot", slotSchema);
//# sourceMappingURL=Slot.js.map