import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  location: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

export const ExperienceModel = mongoose.model("Experience", experienceSchema);
