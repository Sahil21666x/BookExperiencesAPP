import { pgTable, text, integer, timestamp, boolean, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
// Experience Schema
export const experiences = pgTable("experiences", {
    id: integer("id").primaryKey().notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    price: numeric("price").notNull(),
    location: text("location").notNull(),
    imageUrl: text("image_url").notNull(),
});
export const insertExperienceSchema = createInsertSchema(experiences);
// Slot Schema
export const slots = pgTable("slots", {
    id: integer("id").primaryKey().notNull(),
    experienceId: integer("experience_id").notNull(),
    date: text("date").notNull(),
    time: text("time").notNull(),
    capacity: integer("capacity").notNull(),
    booked: integer("booked").notNull().default(0),
});
export const insertSlotSchema = createInsertSchema(slots);
// Booking Schema
export const bookings = pgTable("bookings", {
    id: integer("id").primaryKey().notNull(),
    userName: text("user_name").notNull(),
    email: text("email").notNull(),
    experienceId: integer("experience_id").notNull(),
    slotId: integer("slot_id").notNull(),
    quantity: integer("quantity").notNull(),
    totalPrice: numeric("total_price").notNull(),
    promoCode: text("promo_code"),
    discount: numeric("discount").default("0"),
    bookingStatus: text("booking_status").notNull().default("confirmed"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
export const insertBookingSchema = createInsertSchema(bookings).omit({
    id: true,
    createdAt: true,
});
// Form validation schemas
export const checkoutFormSchema = z.object({
    fullName: z.string().min(1, "Name is required"),
    email: z.string().email("Valid email is required"),
    promoCode: z.string().optional(),
    agreeTerms: z.boolean().refine((val) => val === true, {
        message: "You must agree to terms and conditions",
    }),
});
//# sourceMappingURL=schema.js.map