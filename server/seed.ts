import { ExperienceModel } from "./models/Experience.js";
import { SlotModel } from "./models/Slot.js";

export async function seedDatabase() {
  try {
    // Check if data already exists
    const experienceCount = await ExperienceModel.countDocuments();
    
    if (experienceCount > 0) {
      console.log("Database already seeded, skipping...");
      return;
    }

    // Seed experiences
    const experiences = [
      {
        id: 1,
        title: "Kayaking Adventure",
        location: "Udupi, Karnataka",
        price: "999",
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
        description: "Curated small-group kayaking experience with certified guide. Safety first with gear included. Navigate through scenic waterways and explore hidden coves.",
      },
      {
        id: 2,
        title: "Nandi Hills Sunrise Trek",
        location: "Bangalore, Karnataka",
        price: "899",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        description: "Witness the breathtaking sunrise from Nandi Hills. Early morning trek with experienced guides. Perfect for photography and nature lovers.",
      },
      {
        id: 3,
        title: "Coorg Coffee Trail",
        location: "Coorg, Karnataka",
        price: "1299",
        imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
        description: "Explore lush coffee plantations and learn about coffee cultivation. Includes coffee tasting session and traditional lunch. Small group experience.",
      },
      {
        id: 4,
        title: "River Rafting Experience",
        location: "Rishikesh, Uttarakhand",
        price: "1499",
        imageUrl: "https://images.unsplash.com/photo-1502933691298-84fc14542831?w=800",
        description: "Thrilling white water rafting on the Ganges. Professional guides and all safety equipment provided. Unforgettable adventure experience.",
      },
      {
        id: 5,
        title: "Mountain Cycling Tour",
        location: "Manali, Himachal Pradesh",
        price: "1799",
        imageUrl: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800",
        description: "Scenic mountain cycling through beautiful Himalayan trails. Suitable for intermediate cyclists. Bikes and safety gear included.",
      },
      {
        id: 6,
        title: "Sunderban Boat Cruise",
        location: "Sunderban, West Bengal",
        price: "2499",
        imageUrl: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800",
        description: "Full-day boat cruise through Sunderban mangrove forests. Wildlife spotting including tigers, crocodiles, and exotic birds. Traditional Bengali lunch included.",
      },
      {
        id: 7,
        title: "Bungee Jumping",
        location: "Manali, Himachal Pradesh",
        price: "3999",
        imageUrl: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800",
        description: "Ultimate adrenaline rush with bungee jumping from 150 feet. Certified instructors and international safety standards. Photos and videos included.",
      },
      {
        id: 8,
        title: "Spice Plantation Walk",
        location: "Coorg, Karnataka",
        price: "799",
        imageUrl: "https://images.unsplash.com/photo-1511576661531-b34d7da5d0bb?w=800",
        description: "Guided walk through aromatic spice plantations. Learn about various spices and their cultivation. Includes spice tasting and shopping opportunity.",
      },
    ];

    await ExperienceModel.insertMany(experiences);
    console.log("✅ Experiences seeded");

    // Seed slots
    const slots = [
      // Kayaking Adventure (id: 1)
      { id: 1, experienceId: 1, date: "Oct 22", time: "07:00 am", capacity: 10, booked: 6 },
      { id: 2, experienceId: 1, date: "Oct 22", time: "09:00 am", capacity: 10, booked: 8 },
      { id: 3, experienceId: 1, date: "Oct 22", time: "11:00 am", capacity: 10, booked: 5 },
      { id: 4, experienceId: 1, date: "Oct 22", time: "01:00 pm", capacity: 10, booked: 10 },
      { id: 5, experienceId: 1, date: "Oct 23", time: "07:00 am", capacity: 10, booked: 4 },
      { id: 6, experienceId: 1, date: "Oct 23", time: "09:00 am", capacity: 10, booked: 3 },
      { id: 7, experienceId: 1, date: "Oct 24", time: "07:00 am", capacity: 10, booked: 2 },
      { id: 8, experienceId: 1, date: "Oct 25", time: "07:00 am", capacity: 10, booked: 1 },
      
      // Nandi Hills Sunrise (id: 2)
      { id: 9, experienceId: 2, date: "Oct 22", time: "04:30 am", capacity: 15, booked: 10 },
      { id: 10, experienceId: 2, date: "Oct 22", time: "05:00 am", capacity: 15, booked: 12 },
      { id: 11, experienceId: 2, date: "Oct 23", time: "04:30 am", capacity: 15, booked: 8 },
      { id: 12, experienceId: 2, date: "Oct 24", time: "04:30 am", capacity: 15, booked: 5 },
      
      // Coffee Trail (id: 3)
      { id: 13, experienceId: 3, date: "Oct 22", time: "08:00 am", capacity: 12, booked: 7 },
      { id: 14, experienceId: 3, date: "Oct 22", time: "02:00 pm", capacity: 12, booked: 9 },
      { id: 15, experienceId: 3, date: "Oct 23", time: "08:00 am", capacity: 12, booked: 6 },
      { id: 16, experienceId: 3, date: "Oct 24", time: "08:00 am", capacity: 12, booked: 4 },
      
      // River Rafting (id: 4)
      { id: 17, experienceId: 4, date: "Oct 22", time: "09:00 am", capacity: 20, booked: 15 },
      { id: 18, experienceId: 4, date: "Oct 22", time: "12:00 pm", capacity: 20, booked: 18 },
      { id: 19, experienceId: 4, date: "Oct 23", time: "09:00 am", capacity: 20, booked: 10 },
      { id: 20, experienceId: 4, date: "Oct 24", time: "09:00 am", capacity: 20, booked: 8 },
      
      // Mountain Cycling (id: 5)
      { id: 21, experienceId: 5, date: "Oct 22", time: "06:00 am", capacity: 8, booked: 5 },
      { id: 22, experienceId: 5, date: "Oct 22", time: "03:00 pm", capacity: 8, booked: 6 },
      { id: 23, experienceId: 5, date: "Oct 23", time: "06:00 am", capacity: 8, booked: 3 },
      
      // Sunderban Cruise (id: 6)
      { id: 24, experienceId: 6, date: "Oct 22", time: "07:00 am", capacity: 30, booked: 20 },
      { id: 25, experienceId: 6, date: "Oct 23", time: "07:00 am", capacity: 30, booked: 15 },
      { id: 26, experienceId: 6, date: "Oct 24", time: "07:00 am", capacity: 30, booked: 12 },
      
      // Bungee Jumping (id: 7)
      { id: 27, experienceId: 7, date: "Oct 22", time: "10:00 am", capacity: 5, booked: 4 },
      { id: 28, experienceId: 7, date: "Oct 22", time: "02:00 pm", capacity: 5, booked: 5 },
      { id: 29, experienceId: 7, date: "Oct 23", time: "10:00 am", capacity: 5, booked: 2 },
      
      // Spice Plantation (id: 8)
      { id: 30, experienceId: 8, date: "Oct 22", time: "09:00 am", capacity: 15, booked: 8 },
      { id: 31, experienceId: 8, date: "Oct 22", time: "02:00 pm", capacity: 15, booked: 10 },
      { id: 32, experienceId: 8, date: "Oct 23", time: "09:00 am", capacity: 15, booked: 5 },
    ];

    await SlotModel.insertMany(slots);
    console.log("✅ Slots seeded");
    console.log("✅ Database seeding completed");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}
