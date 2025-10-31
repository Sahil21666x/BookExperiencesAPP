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
export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type Experience = typeof experiences.$inferSelect;

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
export type InsertSlot = z.infer<typeof insertSlotSchema>;
export type Slot = typeof slots.$inferSelect;

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

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

// Form validation schemas
export const checkoutFormSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  promoCode: z.string().optional(),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to terms and conditions",
  }),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

// Promo Code Types
export interface PromoCode {
  code: string;
  discountType: "percentage" | "flat";
  discountValue: number;
}

export interface PromoValidationResponse {
  valid: boolean;
  discount?: number;
  message?: string;
}

// Booking Details Types
export interface BookingDetails {
  experience: Experience | null;
  slot: Slot | null;
  date: string;
  time: string;
  quantity: number;
}

// API Response Types
export interface ExperienceWithSlots extends Experience {
  slots: Slot[];
}

export interface BookingConfirmation extends Booking {
  experience: Experience;
  slot: Slot;
  confirmationId: string;
}
