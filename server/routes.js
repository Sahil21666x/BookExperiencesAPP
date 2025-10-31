import Router from "express";
import { ExperienceModel } from "./models/Experience.js";
import { SlotModel } from "./models/Slot.js";
import { BookingModel } from "./models/Booking.js";
import { insertBookingSchema } from "./shared/schema.js";
import { z } from "zod";
const router = Router();
// Promo codes data
const promoCodes = [
    { code: "SAVE10", discountType: "percentage", discountValue: 10 },
    { code: "FLAT100", discountType: "flat", discountValue: 100 },
];
// GET /api/experiences - Get all experiences
router.get("/api/experiences", async (req, res) => {
    try {
        const experiences = await ExperienceModel.find({}, { _id: 0, __v: 0 }).lean();
        res.json(experiences);
    }
    catch (error) {
        console.error("Error fetching experiences:", error);
        res.status(500).json({ error: "Failed to fetch experiences" });
    }
});
// GET /api/experiences/:id - Get experience by ID with slots
router.get("/api/experiences/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id ?? "0");
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid experience ID" });
        }
        const experience = await ExperienceModel.findOne({ id }, { _id: 0, __v: 0 }).lean();
        if (!experience) {
            return res.status(404).json({ error: "Experience not found" });
        }
        const slots = await SlotModel.find({ experienceId: id }, { _id: 0, __v: 0 }).lean();
        res.json({
            ...experience,
            slots,
        });
    }
    catch (error) {
        console.error("Error fetching experience:", error);
        res.status(500).json({ error: "Failed to fetch experience details" });
    }
});
// POST /api/bookings - Create a new booking
router.post("/api/bookings", async (req, res) => {
    try {
        // Validate request body
        const validatedData = insertBookingSchema.parse(req.body);
        // Check if slot exists and has capacity
        const slot = await SlotModel.findOne({ id: validatedData.slotId }).lean();
        if (!slot) {
            return res.status(404).json({ error: "Slot not found" });
        }
        if (slot.booked + validatedData.quantity > slot.capacity) {
            return res.status(400).json({
                error: "Not enough capacity in this slot. Please select a different time or reduce quantity."
            });
        }
        // Check if experience exists
        const experience = await ExperienceModel.findOne({ id: validatedData.experienceId }).lean();
        if (!experience) {
            return res.status(404).json({ error: "Experience not found" });
        }
        // Update slot booking count
        await SlotModel.updateOne({ id: validatedData.slotId }, { $inc: { booked: validatedData.quantity } });
        // Get next booking ID
        const lastBooking = await BookingModel.findOne().sort({ id: -1 }).lean();
        const nextId = lastBooking ? lastBooking.id + 1 : 1;
        // Create booking
        const booking = await BookingModel.create({
            ...validatedData,
            id: nextId,
        });
        // Generate confirmation ID
        const confirmationId = generateId();
        // Get updated slot
        const updatedSlot = await SlotModel.findOne({ id: validatedData.slotId }, { _id: 0, __v: 0 }).lean();
        // Return booking with confirmation details
        res.status(201).json({
            ...booking.toObject(),
            experience,
            slot: updatedSlot,
            confirmationId,
        });
    }
    catch (error) {
        console.error("Error creating booking:", error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: "Invalid booking data",
                details: error.errors
            });
        }
        if (error instanceof Error && error.message.includes("capacity")) {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: "Failed to create booking" });
    }
});
// POST /api/promo/validate - Validate promo code
router.post("/api/promo/validate", async (req, res) => {
    try {
        const { code, amount } = req.body;
        if (!code || typeof code !== "string") {
            return res.status(400).json({ error: "Promo code is required" });
        }
        if (!amount || typeof amount !== "number" || amount <= 0) {
            return res.status(400).json({ error: "Valid amount is required" });
        }
        const promo = promoCodes.find((p) => p.code.toUpperCase() === code.toUpperCase());
        if (!promo) {
            return res.json({
                valid: false,
                message: "Invalid promo code",
            });
        }
        let discount = 0;
        if (promo.discountType === "percentage") {
            discount = Math.round((amount * promo.discountValue) / 100);
        }
        else {
            discount = promo.discountValue;
        }
        res.json({
            valid: true,
            discount,
            message: `Promo code applied successfully! You saved ₹${discount}`,
        });
    }
    catch (error) {
        console.error("Error validating promo code:", error);
        res.status(500).json({ error: "Failed to validate promo code" });
    }
});
function generateId() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
export default router;
//# sourceMappingURL=routes.js.map